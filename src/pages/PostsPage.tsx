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
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">게시판</h1>
          {/* 로그인한 사용자에게만 글쓰기 버튼을 보여줍니다. */}
          {isLoggedIn && (
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00A63D] hover:bg-[#008c34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A63D] transition-colors cursor-pointer"
              onClick={handleNavigateToWritePage}
            >
              글쓰기
            </button>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <PostList />
        </div>
      </div>
    </div>
  );
}
