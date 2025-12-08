import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/common/footer/Footer";
import Header from "./components/common/header/Header";
import Navbar from "./components/common/navbar/Navbar";
function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
