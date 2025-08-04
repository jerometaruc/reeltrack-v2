import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddPage />} /> 
      <Route path="/reel/:id" element={<DetailPage />} />
    </Routes>
  );
}

export default App;
