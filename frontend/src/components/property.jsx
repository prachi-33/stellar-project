export default function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      title: "Modern Luxury Villa",
      location: "Bangalore, Koramangala",
      price: "150,000 USDC",
      beds: 4,
      baths: 3,
      area: "2,400 sq ft",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      tags: ["Verified", "NFT Deed"],
    },
    {
      id: 2,
      title: "Premium Apartment",
      location: "Mumbai, Bandra West",
      price: "85,000 USDC",
      beds: 3,
      baths: 2,
      area: "1,800 sq ft",
      img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      tags: ["Verified", "NFT Deed", "In Escrow"],
    },
    {
      id: 3,
      title: "Contemporary Penthouse",
      location: "Delhi, Connaught Place",
      price: "320,000 USDC",
      beds: 5,
      baths: 4,
      area: "3,200 sq ft",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118d?auto=format&fit=crop&w=1200&q=80",
      tags: ["Verified", "NFT Deed"],
    },
    {
      id: 4,
      title: "Smart City Residence",
      location: "Hyderabad, Gachibowli",
      price: "95,000 USDC",
      beds: 3,
      baths: 2,
      area: "1,950 sq ft",
      img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      tags: ["Verified"],
    },
    {
      id: 5,
      title: "Waterfront Luxury Home",
      location: "Goa, Candolim Beach",
      price: "450,000 USDC",
      beds: 6,
      baths: 5,
      area: "4,500 sq ft",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      tags: ["Verified", "NFT Deed"],
    },
    {
      id: 6,
      title: "Tech Hub Apartment",
      location: "Pune, Hinjewadi",
      price: "75,000 USDC",
      beds: 2,
      baths: 2,
      area: "1,400 sq ft",
      img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      tags: ["Verified"],
    },
  ];

  return (
    <section className="bg-[#0f172a] text-white py-20 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-5xl font-extrabold text-center">
          Featured <span className="text-blue-400">Properties</span>
        </h2>
        <p className="text-gray-400 text-lg text-center mt-4 max-w-3xl mx-auto">
          Discover premium properties with verified NFT deeds and smart contract escrow
          protection. Start your blockchain real estate journey today.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {["All Properties", "NFT Deeds", "In Escrow", "Verified", "Fractional"].map(
            (filter, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-lg font-medium shadow-md ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>

        {/* Scrollable Row */}
        <div className="flex gap-8 overflow-x-auto mt-14 pb-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {properties.map((property) => (
            <div
              key={property.id}
              className="min-w-[360px] max-w-[360px] bg-[#1e293b] rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={property.img}
                  alt={property.title}
                  className="w-full h-56 object-cover"
                />
                {/* Price */}
                <span className="absolute top-4 right-4 bg-gray-900 text-white text-lg font-bold px-4 py-1 rounded-lg">
                  {property.price}
                </span>
                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {property.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        tag === "Verified"
                          ? "bg-green-500 text-black"
                          : tag === "In Escrow"
                          ? "bg-yellow-500 text-black"
                          : "bg-blue-500 text-black"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold">{property.title}</h3>
                <p className="text-gray-400 mt-2 flex items-center gap-2">
                  📍 {property.location}
                </p>

                {/* Details */}
                <div className="flex justify-between text-gray-300 text-sm mt-4">
                  <span>🛏 {property.beds} beds</span>
                  <span>🛁 {property.baths} baths</span>
                  <span>📐 {property.area}</span>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-between items-center">
                  <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold shadow-lg">
                    View Details
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg">
                    ♻️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer text */}
        <p className="text-gray-400 text-center mt-10">
          Showing 6 of 15,247 properties
        </p>
      </div>
    </section>
  );
}
