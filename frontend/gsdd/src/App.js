import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './common/theme';
import Home from './components/pages/Home';
import MyPage from './components/pages/MyPage';
import Information from './components/pages/Information';
import Login from './components/pages/Login';
import OauthRedirect from './components/pages/OauthRedirect';
import './App.css';

function App() {
  const isLogin = () => localStorage.getItem('accessToken');
  return (
    <div className="background">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isLogin() ? <Home /> : <Navigate to="/login"/>} />
            <Route path="/mypage" element={isLogin() ? <MyPage /> : <Navigate to="/login"/>} />
            <Route path="/login" element={isLogin() ? <Navigate to="/" /> : <Login />} />
            <Route path="/information" element={isLogin() ? <Information /> : <Navigate to="/login"/>} />
            <Route path="/oauth2/redirect" element={<OauthRedirect />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
