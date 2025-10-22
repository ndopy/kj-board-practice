import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePostForm } from '@/features/posts/hooks/usePostForm.ts';
import PostForm from '@/features/posts/components/PostForm.tsx';

export default function PostCreate() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { title, setTitle, content, setContent, handleWritePost } = usePostForm(user);

  useEffect(() => {
    // 로딩이 끝났는데 user가 없으면 로그인 페이지로 이동
    if (!isLoading && !user) {
      alert('로그인이 필요합니다.');
      navigate('/login', { replace: true });
    }
  }, [user, isLoading, navigate]);

  // 인증 정보 로딩 중에는 로딩 상태를 표시
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // 로딩이 끝났지만 user가 없는 경우 (리디렉션 되기 전)
  if (!user) {
    return null;
  }

  return (
    <PostForm
      user={user}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      onSubmit={handleWritePost}
      onCancel={() => navigate('/posts')}
    />
  );
}
