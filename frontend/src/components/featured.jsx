import React, { useState } from 'react';
import { Search, Filter, MapPin, Home, Square } from 'lucide-react';

const FeaturedProperties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const properties = [
    {
      id: 1,
      title: "Modern Downtown Penthouse",
      location: "Manhattan, New York",
      price: 2450000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 2100,
      status: "Available",
      tokenized: true,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Luxury Waterfront Villa",
      location: "Miami Beach, Florida",
      price: 5200000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4500,
      status: "Pending",
      tokenized: true,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Contemporary Urban Loft",
      location: "SoHo, New York",
      price: 1850000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1800,
      status: "Available",
      tokenized: false,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Featured Properties
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Discover premium real estate investments tokenized on the blockchain
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-12 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by location, property type..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">Price Range</option>
          <option value="0-1000000">Under $1M</option>
          <option value="1000000-3000000">$1M - $3M</option>
          <option value="3000000+">Over $3M</option>
        </select>

        <select
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Property Type</option>
          <option value="penthouse">Penthouse</option>
          <option value="villa">Villa</option>
          <option value="loft">Loft</option>
        </select>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div key={property.id} className="bg-gray-800 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
            <div className="relative h-64">
              <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${property.status === 'Available' ? 'bg-green-500' : 'bg-orange-500'}`}>
                  {property.status}
                </span>
              </div>
              {property.tokenized && (
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    Tokenized
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{property.title}</h3>
              <div className="flex items-center text-gray-400 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center justify-between text-gray-400 mb-6">
                <div className="flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-1">🚿</div>
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center">
                  <Square className="w-4 h-4 mr-1" />
                  <span>{property.sqft.toLocaleString()} sq ft</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-yellow-400">
                  ${property.price.toLocaleString()}
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-lg font-medium transition-all">
                  {property.status === 'Available' ? 'View Details' : 'Under Review'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
