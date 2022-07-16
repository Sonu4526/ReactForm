import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Demo from './Form';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Demo />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
