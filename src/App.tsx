import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/Index';
import Inventory from './pages/Inventory';
import Upgrade from './pages/Upgrade';
import CaseBattle from './pages/CaseBattle';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/case-battle" element={<CaseBattle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
