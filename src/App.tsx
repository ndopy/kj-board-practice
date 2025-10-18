import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import LoginForm from './features/auth/components/LoginForm.tsx';
import SignUpForm from './features/auth/components/SignUpForm.tsx';
import PostsPage from './pages/PostsPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
