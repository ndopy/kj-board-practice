import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';

export default function PostForm() {
  // 사용자가 입력한 제목과 내용을 상태로 관리하기
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 로그인한 사용자 정보
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleNavigateToPostsPage = () => {
    navigate('/posts');
  };

  // 작성하기 버튼 이벤트
  const handleWritePost = async () => {
    const url = 'http://localhost:3000/posts';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        authorId: user?.id,
        authorName: user?.name,
        title,
        content
      })
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white py-8 px-10 rounded-md shadow-md">
      <h1 className="text-3xl font-[700]">글 쓰기</h1>
      <ul className="pt-10 flex flex-col gap-8">
        <li>
          <div className="text-xl font-extrabold">작성자</div>
          <div className="py-3.5 border-b-1 border-b-gray-300">{user?.name}</div>
        </li>
        <li>
          <div className="text-xl font-extrabold">제목</div>
          <div className="py-3.5">
            <label htmlFor="title">
              <input
                type="text"
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full pt-1 pb-0.5 outline-none border-b-gray-300 border-b-1 focus:border-b-gray-500"
              />
            </label>
          </div>
        </li>
        <li>
          <div className="text-xl font-extrabold">내용</div>
          <div className="py-3.5">
            <label htmlFor="content">
              <textarea
                id="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full h-40 p-3 resize-none outline-none border-1 border-gray-300 focus:border-gray-500"
              ></textarea>
            </label>
          </div>
        </li>
      </ul>
      {/* 버튼 그룹 */}
      <div className="mt-2 flex justify-end gap-8">
        <button
          onClick={handleWritePost}
          className="w-[10rem] p-3 rounded-md text-xl bg-white text-green-600 border-2 border-green-600 cursor-pointer
                hover:bg-green-600 hover:text-white transition-all 0.5s"
        >
          작성하기
        </button>
        <button
          onClick={handleNavigateToPostsPage}
          className="w-[10rem] p-3 rounded-md text-xl bg-white text-gray-600 border-2 border-gray-600 cursor-pointer
                hover:bg-gray-600 hover:text-white transition-all 0.5s"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
