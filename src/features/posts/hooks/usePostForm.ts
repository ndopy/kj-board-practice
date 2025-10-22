import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPostAPI } from '@/apis/posts.ts';
import type { User } from '@/contexts/AuthContext.tsx';

export const usePostForm = (user: User | null) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleWritePost = async () => {
    // user가 없으면 아무 작업도 하지 않음 (가드)
    if (!user) {
      alert('사용자 정보가 유효하지 않습니다.');
      return;
    }

    // 유효성 검사
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      await createPostAPI({
        authorId: user.userId,
        authorName: user.name,
        title: title.trim(),
        content: content.trim()
      });

      alert('게시글이 성공적으로 작성되었습니다.');
      navigate('/posts');
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : '오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    handleWritePost
  };
};