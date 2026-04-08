import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./Home.tsx";
import Postings from "./Postings.tsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/postings" element={<Postings />} />
    </Routes>
  );
}

export default App;
