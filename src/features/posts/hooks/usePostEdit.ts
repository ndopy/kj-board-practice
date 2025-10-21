import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostDataForEdit } from '@/features/posts/hooks/usePostDataForEdit.ts';
import { updatePostAPI } from '@/apis/posts.ts';

export function usePostEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // usePostDataForEdit 훅을 사용하여 게시글 데이터와 로딩/에러 상태를 가져오기
  const { post: initialPost, isLoading, error } = usePostDataForEdit(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // initialPost가 로드되면 폼 필드를 초기화하기.
    if (initialPost) {
      setTitle(initialPost.title);
      setContent(initialPost.content);
    }
  }, [initialPost]); // initialPost가 변경될 때만 실행하기

  const handleEditPost = async () => {
    // initialPost가 없으면 (로딩 중이거나 에러, 권한 없음) 수정 시도를 막기.
    if (!id || !initialPost) {
      console.error('Attempted to edit post without a valid ID or initial post data.');
      alert('게시글 정보를 찾을 수 없습니다.');
      return;
    }

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
    post: initialPost, // 원본 게시글 데이터를 반환하기.
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
