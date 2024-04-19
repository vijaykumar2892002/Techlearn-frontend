import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/verifyEmail";
import UpdatePassword from "./pages/UpdatePassword";
import AboutSection from "./components/core/AboutPage/AboutSection";
function App() {
  return (
    <div className="custom-app">
      <div className="navbar"><Navbar></Navbar></div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={< Signup />} />
        <Route path="/verify-email" element={< VerifyEmail />} />
        <Route path="/forgot-password" element={< ForgotPassword />} />
        <Route path="update-password/:id" element={<UpdatePassword />}/>
        <Route path="about" element={<AboutSection></AboutSection>}/>
      </Routes>
    </div>
  );
}

export default App;
