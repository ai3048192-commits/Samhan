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
// تأكد أن هذا الملف هو Component وليس مجرد مصفوفة بيانات
import ProjectsData from "./pages/ProjectsData"; 

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
        
        {/* مسار ديناميكي لعرض مشروع محدد بناءً على ID */}
        <Route path="/projectsdata/:id" element={<ProjectsData />} />
        
        <Route path="/smahan" element={<Smahan />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;