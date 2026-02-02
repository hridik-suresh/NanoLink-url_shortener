import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-primary/20 selection:text-primary">
        {/* Navigation Bar */}
        <Navbar />

        <main className="grow w-full max-w-7xl mx-auto px-6 mb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            

            {/* Fallback for 404 */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center pt-20 text-center">
                  <h1 className="text-6xl font-black text-primary">404</h1>
                  <p className="text-secondary mt-4 text-xl">
                    Oops! This page doesn't exist.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
