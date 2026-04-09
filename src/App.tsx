import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./Home.tsx";
import Postings from "./Postings.tsx";
import ClaimForm from './ClaimForm.tsx';
import InquireForm from './InquireForm.tsx';
import ReportForm from './ReportForm.tsx';
import AdminDashboard from './AdminDashboard.tsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/postings" element={<Postings />} />
      <Route path="/claim" element={<ClaimForm />} />
      <Route path="/inquire" element={<InquireForm />} />
      <Route path="/report" element={<ReportForm />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
