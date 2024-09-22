import './App.css';
import CreateHackathon from './component/CreateHackathon';
import Home from './component/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import { Suspense } from 'react';
import List from './component/List';
import HackathonDetails from './component/Details';

function App() {
  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Router>
        < Navbar />
        <Routes>
          <Route path="/" element={<><Home /><List /></>} />
          <Route path="/create" element={<CreateHackathon />} />
          <Route path="/hackathon/:id" element={<HackathonDetails />} />
          <Route path="/create/:id" element={<CreateHackathon />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
