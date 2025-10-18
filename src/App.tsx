import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import MainLayout from './layouts/MainLayout.tsx';
import LoginForm from './features/auth/components/LoginForm.tsx';
import SignUpForm from './features/auth/components/SignUpForm.tsx';
import PostsPage from './pages/PostsPage.tsx';
import PostForm from '@/features/posts/components/PostForm.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Header 없는 페이지 그룹 */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />

        {/* Header 있는 페이지 그룹 */}
        <Route element={<MainLayout />}>
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/write" element={<PostForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
