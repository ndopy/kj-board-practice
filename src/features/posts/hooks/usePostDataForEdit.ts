import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';
import { fetchPostAPI } from '@/apis/posts.ts';
import type { Post } from '@/types/post.ts';

interface UsePostDataForEditResult {
  post: Post | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * 게시글 데이터를 불러오고, 현재 사용자의 수정 권한을 확인하는 커스텀 훅.
 * 권한이 없거나 불러오기 실패 시 적절한 알림 후 페이지를 이동시킵니다.
 */
export function usePostDataForEdit(postId: string | undefined): UsePostDataForEditResult {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId || !user) {
      setIsLoading(false); // ID나 사용자 정보가 없으면 로딩 상태를 종료합니다.
      return;
    }

    const loadPost = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchPostAPI(postId);
        if (data.authorId !== user.userId) {
          alert('수정 권한이 없습니다.');
          navigate(`/posts/${postId}`, { replace: true });
          return; // 권한이 없으면 post를 설정하지 않고 종료
        }
        setPost(data);
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
  }, [postId, user, navigate]);

  return { post, isLoading, error };
}