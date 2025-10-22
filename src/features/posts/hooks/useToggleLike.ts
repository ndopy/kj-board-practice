import { useState, useCallback } from 'react';
import { toggleLikeAPI } from '@/apis/posts';
import type { Post } from '@/types/post';

interface UseToggleLikeProps {
  postId: string | undefined;
  initialLikeCount: number | undefined;
  initialIsLikedByUser: boolean | undefined;
  currentUserId: string | undefined;
  onUpdatePost: (updatedPost: Partial<Post>) => void;
}

export function useToggleLike({
  postId,
  initialLikeCount,
  initialIsLikedByUser,
  currentUserId,
  onUpdatePost
}: UseToggleLikeProps) {
  const [isLiking, setIsLiking] = useState(false);
  const [likeError, setLikeError] = useState<string | null>(null);

  const toggleLike = useCallback(async () => {
    // postId가 없거나, 이미 좋아요 처리 중이면 아무것도 하지 않음
    if (!postId || isLiking) return;

    if (!currentUserId) {
      alert('로그인이 필요합니다.');
      return;
    }

    setIsLiking(true);
    setLikeError(null);

    // 낙관적 업데이트: UI를 먼저 업데이트
    const newIsLiked = !initialIsLikedByUser;
    const newLikeCount = newIsLiked ? (initialLikeCount ?? 0) + 1 : (initialLikeCount ?? 1) - 1;
    onUpdatePost({ likeCount: newLikeCount, isLikedByUser: newIsLiked });

    try {
      // API 호출
      const result = await toggleLikeAPI(postId);
      // API 결과가 낙관적 업데이트와 다를 경우 실제 값으로 동기화 (서버 상태와 강제 동기화)
      if (result.isLikedByUser !== newIsLiked || result.likeCount !== newLikeCount) {
        onUpdatePost({ likeCount: result.likeCount, isLikedByUser: result.isLikedByUser });
      }
    } catch (err) {
      // 에러 발생 시 낙관적 업데이트 되돌리기
      onUpdatePost({ likeCount: initialLikeCount, isLikedByUser: initialIsLikedByUser });
      setLikeError(err instanceof Error ? err.message : '좋아요 상태 변경에 실패했습니다.');
    } finally {
      setIsLiking(false);
    }
  }, [postId, currentUserId, isLiking, initialLikeCount, initialIsLikedByUser, onUpdatePost]);

  return { isLiking, likeError, toggleLike };
}
