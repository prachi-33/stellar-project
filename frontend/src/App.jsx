import { Toaster } from "react-hot-toast";
import About from './pages/about';
import Home from './pages/home';
import Dashboard from "./pages/dashboard";
import NewNFT from "./pages/newNft";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/new" element={<NewNFT />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App;

