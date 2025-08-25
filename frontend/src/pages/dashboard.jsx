import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [userNFTs, setUserNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAddress, setUserAddress] = useState(''); // This would come from wallet connection

  // Mock user address for demo - replace with actual wallet connection
  useEffect(() => {
    // Simulate wallet connection
    setUserAddress('0x1234567890abcdef1234567890abcdef12345678');
  }, []);

  // Fetch user's NFTs
  useEffect(() => {
    const fetchUserNFTs = async () => {
      if (!userAddress) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Replace with your actual API endpoint
        const response = await fetch(`/api/property-nfts?owner=${userAddress}`);
        const data = await response.json();
        
        if (data.success) {
          setUserNFTs(data.data || []);
        } else {
          // Don't show error for empty results, just show no NFTs message
          setUserNFTs([]);
        }
      } catch (err) {
        console.error('Error fetching user NFTs:', err);
        // Even on error, show no NFTs message instead of error
        setUserNFTs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserNFTs();
  }, [userAddress]);

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Truncate address for display
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Loading state
  if (loading) {
    return (
      <section className="relative w-full min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400"></div>
              <p className="text-xl text-gray-400">Loading your properties...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state - only show for critical errors, not for empty results
  if (error && userNFTs.length === 0 && !loading) {
    return (
      <section className="relative w-full min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold mb-4">Error Loading Properties</h2>
              <p className="text-gray-400 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center bg-blue-600/90 text-base px-4 py-2 rounded-full font-semibold">
              🏠 Your Portfolio
            </span>
            <span className="text-gray-400">
              Connected: {truncateAddress(userAddress)}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
            My <span className="text-blue-400">Property NFTs</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl">
            Manage your tokenized real estate portfolio and track your investments
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-blue-400">{userNFTs.length}</div>
            <p className="text-gray-400 mt-2">Total Properties</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-green-400">
              {userNFTs.filter(nft => nft.isForSale).length}
            </div>
            <p className="text-gray-400 mt-2">Listed for Sale</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-yellow-400">
              {formatPrice(userNFTs.reduce((sum, nft) => sum + parseFloat(nft.price || 0), 0))}
            </div>
            <p className="text-gray-400 mt-2">Total Value</p>
          </div>
        </div>

        {/* NFTs Grid or Empty State */}
        {userNFTs.length === 0 ? (
          /* Empty State */
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center max-w-md">
              <div className="text-8xl mb-8">🏘️</div>
              <h2 className="text-3xl font-bold mb-4">No Properties Found</h2>
              <p className="text-gray-400 text-lg mb-8">
                You haven't minted any property NFTs yet. Start building your real estate portfolio today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
                  Create Property NFT
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg font-semibold text-lg border border-gray-600 transition-colors shadow-lg">
                  Browse Marketplace
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* NFTs Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {userNFTs.map((nft) => (
              <div
                key={nft.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* NFT Image */}
                <div className="relative h-64 bg-gray-700">
                  {nft.images ? (
                    <img
                      src={nft.images}
                      alt={nft.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="hidden w-full h-full items-center justify-center bg-gray-700">
                    <span className="text-4xl">🏠</span>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {nft.isForSale ? (
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        For Sale
                      </span>
                    ) : (
                      <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Owned
                      </span>
                    )}
                  </div>

                  {/* Token ID */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      #{nft.tokenId}
                    </span>
                  </div>
                </div>

                {/* NFT Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{nft.title}</h3>
                  
                  <div className="flex items-center text-gray-400 mb-3">
                    <span className="text-lg">📍</span>
                    <span className="ml-2">{nft.location}</span>
                  </div>

                  {nft.description && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {nft.description}
                    </p>
                  )}

                  {/* Property Details */}
                  {(nft.bedrooms || nft.bathrooms || nft.squareFeet) && (
                    <div className="flex gap-4 mb-4 text-sm text-gray-400">
                      {nft.bedrooms && (
                        <span>🛏️ {nft.bedrooms} bed</span>
                      )}
                      {nft.bathrooms && (
                        <span>🛁 {nft.bathrooms} bath</span>
                      )}
                      {nft.squareFeet && (
                        <span>📐 {nft.squareFeet} sq ft</span>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Property Value</p>
                      <p className="text-2xl font-bold text-white">
                        {formatPrice(nft.price)}
                      </p>
                    </div>
                    {nft.isForSale && nft.salePrice && (
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Sale Price</p>
                        <p className="text-xl font-bold text-green-400">
                          {formatPrice(nft.salePrice)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition-colors">
                      View Details
                    </button>
                    {!nft.isForSale ? (
                      <button className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition-colors">
                        List for Sale
                      </button>
                    ) : (
                      <button className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition-colors">
                        Remove Listing
                      </button>
                    )}
                  </div>

                  {/* Creation Date */}
                  <p className="text-xs text-gray-500 mt-4">
                    Minted: {new Date(nft.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Bar */}
        {userNFTs.length > 0 && (
          <div className="mt-16 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg mr-4 transition-colors shadow-lg">
              Create New Property NFT
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg font-semibold text-lg border border-gray-600 transition-colors shadow-lg">
              View Analytics
            </button>
          </div>
        )}
      </div>
    </section>
  );
}