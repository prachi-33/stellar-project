export default function Hero() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://th.bing.com/th/id/OIP.w4WaZESUmSIOXc9nCEKJZQHaEo?w=314&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl w-full px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-14">
        
        {/* Left Section */}
        <div className="flex-1">
          {/* Tag */}
          <span className="inline-flex items-center bg-blue-600/90 text-base lg:text-lg px-5 py-2 rounded-full font-semibold">
            ⚡ Powered by Blockchain Technology
          </span>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold leading-tight mt-8">
            Revolutionary{" "}
            <span className="text-blue-400">Real Estate</span>{" "}
            Marketplace
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl xl:text-2xl text-gray-300 mt-6 max-w-2xl">
            Buy, sell, and invest in properties with NFT deeds, secure escrow,
            and fractional ownership. Experience transparent, trustless real
            estate transactions.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex gap-6">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg xl:text-xl shadow-lg">
              Explore Properties
            </button>
            <button className="bg-black hover:bg-gray-900 px-8 py-4 rounded-lg font-semibold text-lg xl:text-xl border border-gray-700 shadow-lg">
              List Your Property
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-20 text-xl md:text-2xl xl:text-3xl font-bold">
            <div>
              <span className="text-blue-400">$2.4B+</span>
              <p className="text-gray-400 text-base xl:text-lg font-medium mt-2">
                Property Value
              </p>
            </div>
            <div>
              <span className="text-green-400">15K+</span>
              <p className="text-gray-400 text-base xl:text-lg font-medium mt-2">
                Properties Listed
              </p>
            </div>
            <div>
              <span className="text-yellow-400">98%</span>
              <p className="text-gray-400 text-base xl:text-lg font-medium mt-2">
                Successful Trades
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Feature Cards */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="bg-[#0f172a]/90 backdrop-blur-md p-8 rounded-2xl shadow-xl flex items-start gap-6">
            <div className="bg-blue-600 p-4 rounded-xl text-2xl">🛡️</div>
            <div>
              <h3 className="font-semibold text-2xl">Secure NFT Deeds</h3>
              <p className="text-gray-300 text-lg mt-2">
                Every property comes with blockchain-verified ownership through
                NFT technology.
              </p>
            </div>
          </div>

          <div className="bg-[#0f172a]/90 backdrop-blur-md p-8 rounded-2xl shadow-xl flex items-start gap-6">
            <div className="bg-green-500 p-4 rounded-xl text-2xl">📈</div>
            <div>
              <h3 className="font-semibold text-2xl">Smart Escrow</h3>
              <p className="text-gray-300 text-lg mt-2">
                Automated, trustless transactions with built-in buyer and seller
                protection.
              </p>
            </div>
          </div>

          <div className="bg-[#0f172a]/90 backdrop-blur-md p-8 rounded-2xl shadow-xl flex items-start gap-6">
            <div className="bg-yellow-500 p-4 rounded-xl text-2xl">👥</div>
            <div>
              <h3 className="font-semibold text-2xl">Fractional Ownership</h3>
              <p className="text-gray-300 text-lg mt-2">
                Invest in premium properties with as little as $100 through
                tokenized shares.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
