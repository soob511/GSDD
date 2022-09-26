import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './common/theme';
import Home from './components/pages/Home';
import MyPage from './components/pages/MyPage';
import Information from './components/pages/Information';
import Login from './components/pages/Login';
import './App.css';

function App() {
  return (
    <div className="background">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/information" element={<Information />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
