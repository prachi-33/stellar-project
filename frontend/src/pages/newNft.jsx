import { useState } from 'react';
import { getAddress, isAllowed } from "@stellar/freighter-api";
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import * as Client from '../../packages/property';

export default function NewNFT() {
  const contract = new Client.Client({
    ...Client.networks.testnet,
    rpcUrl: 'https://soroban-testnet.stellar.org:443'
  });
  const contractId="CBIPMFJ62DL4UWXOZ4C2STXIXRQJJANAJEY7KG4J3ZC4I7CVWHGOIICU";
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    isForSale: false,
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    yearBuilt: '',
    amenities: [],
    images: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [address,setAddress]=useState(null);
  useEffect(() => {
    const connectWallet = async () => {
        try {
        const connected = await isAllowed();
        if (!connected) {
            toast.error("Please connect your wallet!");
            return;
        }
        const addr = await getAddress();
        setAddress(addr.address); // addr is an object with `address` property in Freighter
        } catch (err) {
        console.error("Error fetching wallet address:", err);
        toast.error("Failed to connect wallet");
        }
    };

    connectWallet();
    }, []); 

  // Predefined amenities list
  const availableAmenities = [
    'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Balcony', 'Terrace',
    'Security', 'Elevator', 'Air Conditioning', 'Heating', 'Fireplace',
    'Walk-in Closet', 'Laundry Room', 'Storage', 'Pet Friendly', 'Furnished'
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle amenities selection
  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.images.trim()) newErrors.images = 'Property image URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Prepare data for backend
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseFloat(formData.bathrooms) : null,
        squareFeet: formData.squareFeet ? parseInt(formData.squareFeet) : null,
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : null,
        // These would come from your wallet/blockchain integration
        tokenId: Math.floor(Math.random() * 10000), // Replace with actual token ID generation
        contractId: '0x1234567890abcdef1234567890abcdef12345678', // Replace with actual contract
        ownerAddress: '0x1234567890abcdef1234567890abcdef12345678', // Replace with user wallet
        creatorAddress: '0x1234567890abcdef1234567890abcdef12345678', // Replace with user wallet
        documentHash: 'Qm' + Math.random().toString(36).substring(2), // Replace with actual IPFS hash
        features: [], // Can be added if needed
        legalStatus: true
      };
      //const result = await contract.mint_property;

      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:3000/api/nft/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();
      toast.success("NFT minted!")

      if (result.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          title: '',
          description: '',
          location: '',
          price: '',
          isForSale: false,
          bedrooms: '',
          bathrooms: '',
          squareFeet: '',
          yearBuilt: '',
          amenities: [],
          images: ''
        });
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error(result.message || 'Failed to create Property NFT');
      }
    } catch (error) {
      console.error('Error creating Property NFT:', error);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-8 lg:px-16 py-16">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center bg-blue-600/90 text-base px-4 py-2 rounded-full font-semibold mb-4">
            🏠 Create NFT
          </span>
          
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
            Tokenize Your <span className="text-blue-400">Property</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Convert your real estate into an NFT and unlock new possibilities for investment and trading
          </p>
        </div>

        {success && (
          <div className="mb-8 p-4 bg-green-600/20 border border-green-500 rounded-xl text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-green-400 mb-2">Property NFT Created Successfully!</h3>
            <p className="text-green-300">Your property has been tokenized and is now available in your dashboard.</p>
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
                Provide a direct URL to your property's main image. Support for multiple images coming soon.
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
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 px-12 py-4 rounded-lg font-semibold text-xl transition-colors shadow-lg disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating NFT...
                </div>
              ) : (
                'Create Property NFT'
              )}
            </button>
            
            <p className="text-gray-400 text-sm mt-4">
              By creating this NFT, you confirm that you own the property and have the legal right to tokenize it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}