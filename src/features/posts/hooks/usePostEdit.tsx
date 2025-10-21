import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';
import { fetchPostAPI, updatePostAPI } from '@/apis/posts.ts';
import type { Post } from '@/types/post.ts';

export function usePostEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !user) return;

    const loadPost = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPostAPI(id);

        if (data.authorId !== user.userId) {
          alert('수정 권한이 없습니다.');
          navigate(`/posts/${id}`, { replace: true });
          return;
        }

        setPost(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (e) {
        console.error(e);
        setError('게시글을 불러오는 데 실패했습니다.');
        alert('게시글을 불러오는 데 실패했습니다.');
        navigate('/posts');
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [id, user, navigate]);

  const handleEditPost = async () => {
    if (!id || !user || !post) return;

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      await updatePostAPI(id, { title, content });
      alert('게시글이 성공적으로 수정되었습니다.');
      navigate(`/posts/${id}`);
    } catch (e) {
      console.error(e);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancel = () => {
    if (id) navigate(`/posts/${id}`);
  };

  return {
    post,
    title,
    content,
    isLoading,
    error,
    setTitle,
    setContent,
    handleEditPost,
    handleCancel
  };
}
