import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Project from "./pages/Project";
import Smahan from "./pages/Smahan";
import ProjectsData from "./pages/ProjectsData";
import SecretLogin from "./pages/SecretLogin"; // <-- إضافة جديدة: استيراد الصفحة

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project" element={<Project />} />

        <Route path="/projects/:id" element={<ProjectsData />} />
        <Route path="/smahan" element={<Smahan />} />

        {/* المسار السري للأدمن */}
        <Route path="/secret-login" element={<SecretLogin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
