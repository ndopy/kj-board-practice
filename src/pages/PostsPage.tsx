import PostList from '../features/posts/components/PostList.tsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';

export default function PostsPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleNavigateToWritePage = () => {
    navigate('/posts/write');
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="rounded-md">
        <PostList />
      </div>
      {/* 로그인한 사용자에게만 글쓰기 버튼을 보여줍니다. */}
      {isLoggedIn && (
        <div className="flex justify-end">
          <button
            className="mr-5 py-2 px-7 rounded-md text-green-600 border border-green-600 tracking-widest
                      hover:bg-green-600 hover:text-white transition-all 0.5s cursor-pointer"
            onClick={handleNavigateToWritePage}
          >
            글쓰기
          </button>
        </div>
      )}
    </div>
  );
}
