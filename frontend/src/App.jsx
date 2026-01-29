import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col items-center font-sans">
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center justify-center w-full p-6 mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/stats" element={<Stats />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
