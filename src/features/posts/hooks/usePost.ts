import { useEffect, useState } from 'react';
import type { Post } from '@/types/post.ts';
import { fetchPostAPI } from '@/apis/posts.ts';

/**
 * 특정 ID의 게시글 데이터를 가져오는 커스텀 훅.
 * @param id - 게시글 ID
 */
export function usePost(id: string | undefined) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPostAPI(id);
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { post, isLoading, error };
}
