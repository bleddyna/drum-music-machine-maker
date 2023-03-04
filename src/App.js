import './App.css';
import Layout from 'components/UI/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'components/Home';
import About from 'components/About';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
        </Routes>
      </Layout>
    </Router>
  );
}
