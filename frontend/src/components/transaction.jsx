import React from 'react';
import { CheckCircle, Clock, AlertCircle, Eye } from 'lucide-react';

const SecureEscrowTransactions = () => {
  const transactions = [
    {
      id: "ESC-001",
      property: "Modern Downtown Penthouse",
      amount: 2450000,
      progress: 60,
      status: "In Progress",
      buyer: "0x1234...5678",
      seller: "0x8765...4321",
      steps: [
        { name: "Payment Locked", completed: true, current: false },
        { name: "KYC Verification", completed: true, current: false },
        { name: "Property Inspection", completed: false, current: true },
        { name: "NFT Transfer", completed: false, current: false }
      ]
    },
    {
      id: "ESC-002",
      property: "Luxury Waterfront Villa",
      amount: 5200000,
      progress: 100,
      status: "Completed",
      buyer: "0x9876...1234",
      seller: "0x5432...8765",
      steps: [
        { name: "Payment Locked", completed: true, current: false },
        { name: "KYC Verification", completed: true, current: false },
        { name: "Property Inspection", completed: true, current: false },
        { name: "NFT Transfer", completed: true, current: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Secure Escrow Transactions
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Track recent real estate transactions with complete transparency and security
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">{transaction.property}</h3>
                <div className="flex items-center gap-4 text-gray-400">
                  <span>Transaction ID: {transaction.id}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${transaction.status === 'Completed' ? 'bg-green-500' : 'bg-orange-500'}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
              <div className="text-right mt-4 lg:mt-0">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  ${transaction.amount.toLocaleString()}
                </div>
                <div className="text-gray-400">{transaction.progress}%</div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{transaction.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${transaction.progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}
                  style={{ width: `${transaction.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {transaction.steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {step.completed ? <CheckCircle className="w-6 h-6 text-green-500" /> : step.current ? <Clock className="w-6 h-6 text-orange-500" /> : <AlertCircle className="w-6 h-6 text-gray-500" />}
                  <span className={`text-sm ${step.completed ? 'text-green-400' : step.current ? 'text-orange-400' : 'text-gray-500'}`}>{step.name}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Buyer</h4>
                <div className="font-mono text-lg bg-gray-700 px-4 py-2 rounded-lg">{transaction.buyer}</div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Seller</h4>
                <div className="font-mono text-lg bg-gray-700 px-4 py-2 rounded-lg">{transaction.seller}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                View Details
              </button>
              {transaction.status === 'In Progress' && (
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Verify
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecureEscrowTransactions;
