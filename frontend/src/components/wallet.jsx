import React, { useState } from "react";
import { isConnected, setAllowed, getAddress, isAllowed } from "@stellar/freighter-api";
import toast from "react-hot-toast";

export default function WalletButton() {
  const [address, setAddress] = useState(null);
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      const installed = await isConnected();
      if (!installed) {
        toast.error("Freighter not installed!");
        return;
      }

      await setAllowed();
      const addr = await getAddress(); // already a string
      setAddress(addr.address);
      setConnected(true);
      toast.success("Wallet Connected!");
    } catch (error) {
      toast.error("Error connecting to Freighter!");
      console.error(error);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setConnected(false);
    toast("Wallet Disconnected!", { icon: "👋" });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {connected ? (
        <div className="flex flex-row">
          <button className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-indigo-700 cursor-pointer">
            {address.slice(0, 6)}...{address.slice(-4)}
          </button>
            <button
              onClick={disconnectWallet}
              className="px-6 py-3 ml-2 bg-indigo-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-indigo-700 cursor-pointer"
            >
              Disconnect
            </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-indigo-700 cursor-pointer"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
