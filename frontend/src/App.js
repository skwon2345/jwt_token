import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route element={<PrivateRoute><HomePage /></PrivateRoute>} path="/" exact />
          <Route element={<LoginPage />} path="/login" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
