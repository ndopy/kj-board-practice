import PostList from '../features/posts/components/PostList.tsx';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { useNavigate } from 'react-router-dom';

export default function PostsPage() {
  const navigate = useNavigate();

  const handleNavigateToWritePage = () => {
    navigate('/posts/write');
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="rounded-md">
        <PostList />
      </div>
      {/* 글 쓰기 버튼 */}
      <div className="mt-1 flex justify-end">
        <button
          className="mr-5 py-2 px-7 rounded-md text-green-600 border border-green-600 tracking-widest
                    hover:bg-green-600 hover:text-white transition-all 0.5s cursor-pointer"
          onClick={handleNavigateToWritePage}
        >
          글쓰기
        </button>
      </div>
      <div className="mt-4 flex justify-center items-center">
        {/* 페이지네이션 */}
        <ul
          className="flex items-center gap-2
            [&>li]:w-8 [&>li]:h-8 [&>li]:flex [&>li]:items-center [&>li]:justify-center [&>li]:rounded-md
            [&>li]:transition-all [&>li]:duration-250 [&>li]:cursor-pointer
            [&>li:hover]:bg-green-600 [&>li:hover]:text-white"
        >
          <li>
            <ArrowLeftIcon className="h-4 w-4" />
          </li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>
            <ArrowRightIcon className="h-4 w-4" />
          </li>
        </ul>
      </div>
    </div>
  );
}
