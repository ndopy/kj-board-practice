import { useEffect, useState } from 'react';
import type { Post } from '@/types/post.ts';
import { fetchPostAPI } from '@/apis/posts.ts';

/**
 * 특정 ID의 게시글 데이터를 가져오는 커스텀 훅.
 * @param id - 게시글 ID
 * @param currentUserId - 현재 로그인한 사용자 ID (좋아요 상태 확인용)
 */
export function usePost(id: string | undefined, currentUserId?: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        // API로부터 원본 데이터를 받습니다.
        const rawData = await fetchPostAPI(id);

        const processedData = {
          ...rawData,
          isLikedByUser: !!(currentUserId && rawData.likedBy?.includes(currentUserId))
        };
        setPost(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, currentUserId]);

  return { post, isLoading, error, setPost };
}
