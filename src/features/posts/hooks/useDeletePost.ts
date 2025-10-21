import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePostAPI } from '@/apis/posts'; // deletePostAPI를 가져온다.

/**
 * 게시글 삭제를 처리하는 커스텀 훅.
 */
export function useDeletePost() {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const deletePost = async (id: string) => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deletePostAPI(id); // apiClient 대신 deletePostAPI를 사용한다.
      alert('게시글이 삭제되었습니다.');
      navigate('/posts');
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return { deletePost, isDeleting };
}
