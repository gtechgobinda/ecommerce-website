import { BrowserRouter, Route, Routes } from "react-router-dom";
//components
import { Footer, Header } from "./components";
//pages
import { Contact, Home } from "./pages";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
