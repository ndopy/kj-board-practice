import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';

export default function PostCreate() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 1. 인증 상태 확인은 useEffect에서 처리
  useEffect(() => {
    // user 정보가 로딩 중일 수 있으므로, 로딩이 끝났는데도 user가 없으면 로그인 페이지로 이동
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/login', { replace: true }); // replace: true로 히스토리 스택에 쌓이지 않게 함
    }
  }, [user, navigate]);

  const handleNavigateToPostsPage = () => {
    navigate('/posts');
  };

  // 작성하기 버튼 이벤트
  const handleWritePost = async () => {
    // 2. 기본적인 유효성 검사
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const url = 'http://localhost:3000/posts';
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        authorId: user?.userId,
        authorName: user?.name,
        title,
        content
      })
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('게시글 작성에 실패했습니다.');
      }
      // 3. 작성 성공 후 피드백 및 페이지 이동
      alert('게시글이 성공적으로 작성되었습니다.');
      navigate('/posts');
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // user 정보가 아직 로드되지 않았다면 아무것도 렌더링하지 않음
  if (!user) {
    return null;
  }

  return (
    <div className="bg-white py-8 px-10 rounded-md shadow-md">
      <h1 className="text-3xl font-[700]">글 쓰기</h1>
      <ul className="pt-10 flex flex-col gap-8">
        <li>
          <div className="text-xl font-extrabold">작성자</div>
          <div className="py-3.5 border-b-1 border-b-gray-300">{user.name}</div>
        </li>
        <li>
          <div className="text-xl font-extrabold">제목</div>
          <div className="py-3.5">
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full pt-1 pb-0.5 outline-none border-b-gray-300 border-b-1 focus:border-b-gray-500"
              placeholder="제목을 입력하세요"
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
              placeholder="내용을 입력하세요"
            ></textarea>
          </div>
        </li>
      </ul>
      <div className="mt-2 flex justify-end gap-8">
        <button
          onClick={handleWritePost}
          className="w-[10rem] p-3 rounded-md text-xl bg-white text-green-600 border-2 border-green-600 cursor-pointer hover:bg-green-600 hover:text-white transition-all"
        >
          작성하기
        </button>
        <button
          onClick={handleNavigateToPostsPage}
          className="w-[10rem] p-3 rounded-md text-xl bg-white text-gray-600 border-2 border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white transition-all"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
