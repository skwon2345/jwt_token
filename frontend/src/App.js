import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<HomePage />} path="/" exact />
          <Route element={<LoginPage />} path="/login" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
