export default function About() {
  const techStack = [
    {
      category: "Blockchain",
      icon: "⛓️",
      technologies: [
        { name: "Stellar Network", description: "Fast, low-cost blockchain for real estate tokenization" },
        { name: "Soroban SDK", description: "Smart contracts for escrow, lending, and fractional ownership" },
        { name: "Stellar Assets", description: "Native token support for property shares and payments" }
      ]
    },
    {
      category: "Frontend",
      icon: "🎨",
      technologies: [
        { name: "React 18", description: "Modern UI with hooks and state management" },
        { name: "Tailwind CSS", description: "Utility-first styling for responsive design" },
        { name: "Prisma Client", description: "Type-safe database access and queries" }
      ]
    },
    {
      category: "Backend",
      icon: "⚙️",
      technologies: [
        { name: "Express.js", description: "RESTful API server with middleware support" },
        { name: "Node.js", description: "JavaScript runtime for scalable backend services" },
        { name: "JWT Authentication", description: "Secure user authentication and authorization" }
      ]
    },
    {
      category: "Database",
      icon: "🗄️",
      technologies: [
        { name: "PostgreSQL", description: "Reliable relational database for property metadata" },
        { name: "Prisma ORM", description: "Database toolkit with migrations and type safety" },
        { name: "Redis Cache", description: "High-performance caching for frequently accessed data" }
      ]
    }
  ];

  const features = [
    {
      title: "NFT Property Deeds",
      description: "Each property is tokenized as a unique NFT with immutable ownership records on Stellar blockchain.",
      icon: "🏠"
    },
    {
      title: "Smart Escrow System",
      description: "Trustless property transactions with automated escrow using Soroban smart contracts.",
      icon: "🔒"
    },
    {
      title: "Fractional Ownership",
      description: "Split property ownership into tradeable tokens, enabling shared investment and liquidity.",
      icon: "🧩"
    },
    {
      title: "DeFi Mortgage Lending",
      description: "Use property tokens as collateral for stablecoin loans without traditional banks.",
      icon: "💰"
    },
    {
      title: "Crowdfunding Platform",
      description: "Developers raise funds for projects by issuing future property share tokens.",
      icon: "🏗️"
    },
    {
      title: "Global Accessibility",
      description: "Cross-border property investment with stablecoin payments and instant settlements.",
      icon: "🌍"
    }
  ];

  const stats = [
    { label: "Smart Contracts Deployed", value: "15+", icon: "📋" },
    { label: "Properties Tokenized", value: "$50M+", icon: "🏘️" },
    { label: "Active Users", value: "10K+", icon: "👥" },
    { label: "Transaction Volume", value: "$2.4B+", icon: "💸" },
    { label: "Avg. Gas Cost", value: "<$0.01", icon: "⛽" },
    { label: "Settlement Time", value: "~5 sec", icon: "⚡" }
  ];

  return (
    <section className="relative w-full min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-flex items-center bg-blue-600/90 text-base px-4 py-2 rounded-full font-semibold mb-4">
            🚀 About Our Platform
          </span>
          
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
            Revolutionizing <span className="text-blue-400">Real Estate</span> with Blockchain
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
            We're building the future of real estate investment by combining Web3 technology with traditional property markets. 
            Our platform enables trustless transactions, fractional ownership, and DeFi-powered lending - all on the Stellar blockchain.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🏦</div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">Democratize Access</h3>
              <p className="text-gray-300">Make real estate investment accessible to everyone through fractional ownership and low entry barriers.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">Eliminate Middlemen</h3>
              <p className="text-gray-300">Remove traditional intermediaries using smart contracts for transparent, automated transactions.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">Enable Global Trading</h3>
              <p className="text-gray-300">Break down geographical barriers with blockchain-based property ownership and cross-border payments.</p>
            </div>
          </div>
        </div>

        {/* Platform Features */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Platform <span className="text-blue-400">Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-blue-400">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our <span className="text-blue-400">Technology Stack</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {techStack.map((stack, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-4">{stack.icon}</span>
                  <h3 className="text-2xl font-bold text-blue-400">{stack.category}</h3>
                </div>
                
                <div className="space-y-4">
                  {stack.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="border-l-2 border-blue-500/50 pl-4">
                      <h4 className="font-semibold text-white mb-1">{tech.name}</h4>
                      <p className="text-gray-400 text-sm">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Stats */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Platform <span className="text-blue-400">Statistics</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center hover:border-blue-500/50 transition-all duration-300">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How Our <span className="text-blue-400">Platform Works</span>
          </h2>
          
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 border border-blue-500/30">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-bold mb-3 text-blue-400">1. Tokenization & Marketplace</h3>
                <p className="text-gray-300">Properties are tokenized as NFT deeds with metadata stored on IPFS. Buyers purchase using stablecoins with automated escrow.</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl p-6 border border-green-500/30">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-3 text-green-400">2. DeFi Mortgage Lending</h3>
                <p className="text-gray-300">Property NFTs are fractionalized into ERC-20 tokens that can be used as collateral for stablecoin loans.</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl p-6 border border-purple-500/30">
                <div className="text-4xl mb-4">🏗️</div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">3. Development Crowdfunding</h3>
                <p className="text-gray-300">Developers raise funds by issuing future property share tokens, giving retail investors early access to projects.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Stellar */}
        <div className="mb-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-8 border border-gray-600">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Why We Built on <span className="text-blue-400">Stellar</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold mb-2 text-blue-400">Fast Settlement</h3>
              <p className="text-gray-400 text-sm">3-5 second transaction finality</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💸</div>
              <h3 className="font-bold mb-2 text-blue-400">Low Costs</h3>
              <p className="text-gray-400 text-sm">Fractions of a cent per transaction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-bold mb-2 text-blue-400">Global Reach</h3>
              <p className="text-gray-400 text-sm">Built-in multi-currency support</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-bold mb-2 text-blue-400">Enterprise Security</h3>
              <p className="text-gray-400 text-sm">Bank-grade security and compliance</p>
            </div>
          </div>
        </div>

        {/* Team Vision */}
        <div className="text-center bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold mb-6">
            Our <span className="text-blue-400">Vision</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-6">
            We envision a world where real estate investment is as simple as buying stocks, where property ownership is liquid and accessible, 
            and where blockchain technology eliminates the friction and opacity of traditional real estate markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Start Investing
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg font-semibold text-lg border border-gray-600 transition-colors shadow-lg">
              Join Our Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}