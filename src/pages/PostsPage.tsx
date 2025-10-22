import { type FormEvent, useState } from 'react';
import PostList from '../features/posts/components/PostList.tsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';

export default function PostsPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');

  const handleNavigateToWritePage = () => {
    navigate('/posts/write');
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(searchTerm);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
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
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="게시글 제목을 검색하세요."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00A63D] focus:border-[#00A63D] sm:text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              검색
            </button>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <PostList query={query} />
        </div>
      </div>
    </div>
  );
}
