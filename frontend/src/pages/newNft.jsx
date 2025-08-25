import React, { useState, useEffect } from 'react';
import { getAddress, isAllowed, signTransaction } from "@stellar/freighter-api";
import { Server } from '@stellar/stellar-sdk/rpc';
import {
  Contract,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  Address,
  nativeToScVal,
  scValToNative,
} from '@stellar/stellar-sdk';
import toast from 'react-hot-toast';
import { Client as PropertyNFT } from "../../packages/property/src/index"; // removed .ts

const CONTRACT_ID = "CAQOMGBI6XWD53ZB6WJFIMR5GB7D2UY7FCFOJLPF2NBWSCU3D7RJDAJT";
const RPC_URL = "https://soroban-testnet.stellar.org:443";
const NETWORK_PASSPHRASE = Networks.TESTNET;

export default function NewNFT() {
  const [formData, setFormData] = useState({
    title: '', description: '', location: '', price: '', isForSale: false,
    bedrooms: '', bathrooms: '', squareFeet: '', yearBuilt: '',
    amenities: [], images: '', salePrice: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [mintResult, setMintResult] = useState(null);
  const [rpc, setRpc] = useState(null);

  const availableAmenities = [
    'Swimming Pool','Gym','Parking','Garden','Balcony','Terrace',
    'Security','Elevator','Air Conditioning','Heating','Fireplace',
    'Walk-in Closet','Laundry Room','Storage','Pet Friendly','Furnished'
  ];

  // RPC initialization
  useEffect(() => {
    try {
      const server = new Server(RPC_URL);
      setRpc(server);
    } catch (error) {
      console.error("RPC init failed:", error);
      setRpc({
        simulateTransaction: async () => ({ status: 'error', error: 'RPC not available' }),
        sendTransaction: async () => ({ status: 'error', error: 'RPC not available' }),
        getTransaction: async () => ({ status: 'error', error: 'RPC not available' }),
        getAccount: async () => ({ sequenceNumber: '0' })
      });
      toast.error("RPC initialization failed. Using mock server");
    }
  }, []);

  // Wallet connection
  useEffect(() => {
    const connectWallet = async () => {
      try {
        const allowed = await isAllowed();
        if (!allowed) { toast.error("Please connect Freighter wallet!"); return; }
        const addr = await getAddress();
        setAddress(addr.address);
        setWalletConnected(true);
        toast.success("Wallet connected!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to connect wallet. Install Freighter.");
        setWalletConnected(false);
      }
    };
    connectWallet();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.images.trim()) newErrors.images = 'Property image URL is required';
    if (!address) newErrors.wallet = 'Connect your wallet first';
    if (formData.isForSale && (!formData.salePrice || parseFloat(formData.salePrice) <= 0)) {
      newErrors.salePrice = 'Sale price required when listing for sale';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createPropertyDocument = () => {
    const metadata = {
      name: formData.title,
      description: formData.description,
      image: formData.images,
      attributes: [
        { trait_type: "Location", value: formData.location },
        { trait_type: "Price", value: `$${parseFloat(formData.price).toLocaleString()}` },
        { trait_type: "Property Type", value: "Real Estate" },
        ...(formData.bedrooms ? [{ trait_type: "Bedrooms", value: formData.bedrooms }] : []),
        ...(formData.bathrooms ? [{ trait_type: "Bathrooms", value: formData.bathrooms }] : []),
        ...(formData.squareFeet ? [{ trait_type: "Square Feet", value: formData.squareFeet }] : []),
        ...(formData.yearBuilt ? [{ trait_type: "Year Built", value: formData.yearBuilt }] : []),
        ...(formData.amenities.length ? [{ trait_type: "Amenities", value: formData.amenities.join(", ") }] : []),
        { trait_type: "For Sale", value: formData.isForSale ? "Yes" : "No" },
        { trait_type: "Creation Date", value: new Date().toISOString() }
      ],
      external_url: `https://property-nft.com/property/${Date.now()}`,
      seller_fee_basis_points: 250,
      fee_recipient: address
    };
    return JSON.stringify(metadata);
  };

  const prepareContractArgs = () => {
    const documentData = createPropertyDocument();
    const priceInCents = Math.floor(parseFloat(formData.price) * 100);
    return [
      new Address(address).toScVal(),
      nativeToScVal(formData.location),
      nativeToScVal(priceInCents),
      nativeToScVal(documentData)
    ];
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setMintResult(null);
    try {
      if (!rpc) throw new Error("RPC not initialized");
      const account = await rpc.getAccount(address);
      const contract = new Contract(CONTRACT_ID);
      const args = prepareContractArgs();

      let tx = new TransactionBuilder(account, { 
        fee: BASE_FEE, 
        networkPassphrase: NETWORK_PASSPHRASE 
      })
        .addOperation(contract.call("mint_property", ...args))
        .setTimeout(300)
        .build();

      toast.loading("Sign transaction in Freighter...", { id: 'mint-loading' });
      const signedXDR = await signTransaction(tx.toXDR(), { 
        networkPassphrase: NETWORK_PASSPHRASE, 
        accountToSign: address 
      });

      console.log("Signed XDR:", signedXDR);

      // CORRECTED: Pass the XDR string directly to sendTransaction
      const submit = await rpc.sendTransaction(signedXDR);

      // The rest of your transaction polling logic can remain the same
      if (submit.status === "PENDING") {
        let status = submit;
        let attempts = 0;
        while (status.status === "PENDING" && attempts < 30) {
          await new Promise(r => setTimeout(r, 10000));
          status = await rpc.getTransaction(submit.hash);
          attempts++;
          toast.loading(`Waiting for confirmation... (${attempts * 10}s)`, { id: 'mint-loading' });
        }
        if (status.status !== "SUCCESS") throw new Error(`Transaction failed: ${status.status}`);
        submit.returnValue = status.returnValue;
      }
      
      const tokenId = submit.returnValue ? scValToNative(submit.returnValue) : 'N/A';
      toast.success(`Property NFT minted! Token ID: ${tokenId}`, { id: 'mint-loading' });
      setMintResult({ tokenId, transactionHash: submit.hash, contractId: CONTRACT_ID });
      setSuccess(true);
      setFormData({ 
        title:'', description:'', location:'', price:'', isForSale:false, 
        bedrooms:'', bathrooms:'', squareFeet:'', yearBuilt:'', 
        amenities:[], images:'', salePrice:'' 
      });
      setTimeout(() => setSuccess(false), 10000);

    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Minting failed', { id: 'mint-loading' });
    } finally {
      setLoading(false);
    }
  };

  const retryWalletConnection = async () => {
    try {
      const allowed = await isAllowed();
      if (allowed) { const addr = await getAddress(); setAddress(addr.address); setWalletConnected(true); toast.success("Wallet connected!"); }
      else toast.error("Allow wallet connection in Freighter");
    } catch { toast.error("Failed to connect wallet"); }
  };


  return (
    <section className="relative w-full min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-8 lg:px-16 py-16">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center bg-blue-600/90 text-base px-4 py-2 rounded-full font-semibold mb-4">
            🏠 Create Real NFT on Stellar
          </span>
          
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
            Tokenize Your <span className="text-blue-400">Property</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Convert your real estate into an NFT on Stellar blockchain with real transactions and Freighter wallet signing
          </p>
        </div>

        {/* Wallet Connection Status */}
        {!walletConnected && (
          <div className="mb-8 p-4 bg-red-600/20 border border-red-500 rounded-xl text-center">
            <div className="text-4xl mb-2">🔒</div>
            <h3 className="text-xl font-bold text-red-400 mb-2">Wallet Not Connected</h3>
            <p className="text-red-300 mb-4">Please connect your Freighter wallet to mint Property NFTs</p>
            <button
              onClick={retryWalletConnection}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Connect Wallet
            </button>
          </div>
        )}

        {walletConnected && address && (
          <div className="mb-8 p-4 bg-green-600/20 border border-green-500 rounded-xl">
            <div className="flex items-center justify-center gap-3">
              <div className="text-2xl">✅</div>
              <div>
                <h3 className="text-lg font-bold text-green-400">Wallet Connected</h3>
                <p className="text-green-300 font-mono text-sm break-all">{address}</p>
              </div>
            </div>
          </div>
        )}

        {success && mintResult && (
          <div className="mb-8 p-6 bg-green-600/20 border border-green-500 rounded-xl">
            <div className="text-4xl mb-4 text-center">🎉</div>
            <h3 className="text-xl font-bold text-green-400 mb-4 text-center">Property NFT Created Successfully!</h3>
            
            <div className="bg-green-600/30 p-4 rounded-lg space-y-2">
              <p className="text-sm text-green-200"><strong>Token ID:</strong> {mintResult.tokenId}</p>
              <p className="text-sm text-green-200"><strong>Contract:</strong> {mintResult.contractId}</p>
              <p className="text-sm text-green-200"><strong>Transaction Hash:</strong> 
                <span className="font-mono ml-1 break-all">{mintResult.transactionHash}</span>
              </p>
              <p className="text-sm text-green-200"><strong>Network:</strong> Stellar Testnet</p>
              <a 
                href={`https://stellar.expert/explorer/testnet/tx/${mintResult.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition-colors"
              >
                View on Stellar Expert →
              </a>
            </div>
          </div>
        )}

        <div className="space-y-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Property Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Property Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Modern Downtown Apartment"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="123 Main St, New York, NY 10001"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
                {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Property Value (USD) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="500000"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
                {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
              </div>

              {formData.isForSale && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Sale Price (USD) *</label>
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    placeholder="450000"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                  {errors.salePrice && <p className="text-red-400 text-sm mt-1">{errors.salePrice}</p>}
                </div>
              )}

              <div className="flex items-center h-full pt-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isForSale"
                    checked={formData.isForSale}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`relative w-12 h-6 rounded-full transition-colors ${formData.isForSale ? 'bg-blue-600' : 'bg-gray-600'}`}>
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.isForSale ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                  <span className="ml-3 text-sm font-semibold">List for sale immediately</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your property, its unique features, and what makes it special..."
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Property Specifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  placeholder="3"
                  min="0"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="2.5"
                  min="0"
                  step="0.5"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Square Feet</label>
                <input
                  type="number"
                  name="squareFeet"
                  value={formData.squareFeet}
                  onChange={handleInputChange}
                  placeholder="1500"
                  min="0"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Year Built</label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleInputChange}
                  placeholder="2020"
                  min="1800"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Amenities</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableAmenities.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`p-3 rounded-lg border text-sm font-semibold transition-all ${
                    formData.amenities.includes(amenity)
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
            
            {formData.amenities.length > 0 && (
              <div className="mt-4 p-3 bg-blue-600/20 border border-blue-500/50 rounded-lg">
                <p className="text-sm text-blue-300">
                  Selected: {formData.amenities.join(', ')}
                </p>
              </div>
            )}
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Property Images</h2>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Main Image URL *</label>
              <input
                type="url"
                name="images"
                value={formData.images}
                onChange={handleInputChange}
                placeholder="https://example.com/property-image.jpg"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
              {errors.images && <p className="text-red-400 text-sm mt-1">{errors.images}</p>}
              <p className="text-gray-400 text-xs mt-2">
                Provide a direct URL to your property's main image. This will be stored in the NFT metadata.
              </p>
            </div>

            {formData.images && (
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Preview:</p>
                <div className="w-full h-48 bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={formData.images}
                    alt="Property preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center bg-gray-700">
                    <span className="text-gray-400">Invalid image URL</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            {errors.submit && (
              <p className="text-red-400 text-sm mb-4">{errors.submit}</p>
            )}
            
            {errors.wallet && (
              <p className="text-red-400 text-sm mb-4">{errors.wallet}</p>
            )}
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !walletConnected}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 px-12 py-4 rounded-lg font-semibold text-xl transition-colors shadow-lg disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating NFT on Stellar...
                </div>
              ) : !walletConnected ? (
                'Connect Wallet to Continue'
              ) : (
                'Create Property NFT'
              )}
            </button>
            
            <p className="text-gray-400 text-sm mt-4">
              By creating this NFT, you confirm that you own the property and have the legal right to tokenize it on Stellar blockchain.
            </p>

            {walletConnected && (
              <div className="mt-4 p-3 bg-blue-600/20 border border-blue-500/50 rounded-lg">
                <p className="text-xs text-blue-300">
                  <strong>Network:</strong> Stellar Testnet | 
                  <strong> Contract:</strong> CBIPMF...IICU | 
                  <strong> Gas:</strong> ~0.01 XLM
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}