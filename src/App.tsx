import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import MainLayout from './layouts/MainLayout.tsx';
import LoginForm from './features/auth/components/LoginForm.tsx';
import SignUpForm from './features/auth/components/SignUpForm.tsx';
import PostsPage from './pages/PostsPage.tsx';
import PostCreate from '@/features/posts/components/PostCreate.tsx';
import PostDetail from '@/features/posts/components/PostDetail.tsx';
import PostEdit from '@/features/posts/components/PostEdit.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Header 없는 페이지 그룹 */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />

        {/* Header 있는 페이지 그룹 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<PostsPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/write" element={<PostCreate />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/:id/edit" element={<PostEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
