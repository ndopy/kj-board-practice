import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';

export default function PostEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');

  // 1. 기존 게시글 데이터를 불러와서 state에 설정
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        if (!response.ok) throw new Error('데이터 로딩 실패');
        const data = await response.json();

        // 작성자가 아니면 접근 차단
        if (data.authorId !== user?.userId) {
          alert('수정 권한이 없습니다.');
          navigate(`/posts/${id}`, { replace: true });
          return;
        }

        setTitle(data.title);
        setContent(data.content);
        setAuthorName(data.authorName);
      } catch (error) {
        console.error(error);
        alert('게시글을 불러오는 데 실패했습니다.');
        navigate('/posts');
      }
    };

    if (user) {
      fetchPost();
    }
  }, [id, user, navigate]);

  // 수정하기 버튼 이벤트
  const handleEditPost = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const url = `http://localhost:3000/posts/${id}`;
    const options = {
      method: 'PUT', // 2. POST 대신 PUT 메서드 사용
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // 수정 시 변경되지 않는 정보도 함께 보내줍니다.
        ...{ authorId: user?.userId, authorName: user?.name },
        title,
        content
      })
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('게시글 수정에 실패했습니다.');
      }
      alert('게시글이 성공적으로 수정되었습니다.');
      navigate(`/posts/${id}`); // 3. 수정 후 상세 페이지로 이동
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  if (!authorName) return <div>로딩 중...</div>; // 데이터 로딩 중 표시

  return (
    <div className="bg-white py-8 px-10 rounded-md shadow-md">
      <h1 className="text-3xl font-[700]">글 수정하기</h1>
      <ul className="pt-10 flex flex-col gap-8">
        <li>
          <div className="text-xl font-extrabold">작성자</div>
          <div className="py-3.5 border-b-1 border-b-gray-300">{authorName}</div>
        </li>
        <li>
          <div className="text-xl font-extrabold">제목</div>
          <div className="py-3.5">
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full pt-1 pb-0.5 outline-none border-b-gray-300 border-b-1 focus:border-b-gray-500"
            />
          </div>
        </li>
        <li>
          <div className="text-xl font-extrabold">내용</div>
          <div className="py-3.5">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full h-40 p-3 resize-none outline-none border-1 border-gray-300 focus:border-gray-500"
            ></textarea>
          </div>
        </li>
      </ul>
      <div className="mt-2 flex justify-end gap-8">
        <button
          onClick={handleEditPost}
          className="w-[10rem] p-3 rounded-md text-xl bg-white text-blue-600 border-2 border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition-all"
        >
          수정하기
        </button>
        <button
          onClick={() => navigate(`/posts/${id}`)}
          className="w-[10rem] p-3 rounded-md text-xl bg-white text-gray-600 border-2 border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white transition-all"
        >
          취소
        </button>
      </div>
    </div>
  );
}
