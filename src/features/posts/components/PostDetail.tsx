import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';

// Post 데이터 타입을 정의합니다.
interface Post {
  id: number;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        if (!response.ok) {
          throw new Error('게시글을 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDeletePost = async () => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('삭제에 실패했습니다.');
      }

      alert('게시글이 삭제되었습니다.');
      navigate('/posts');
    } catch (error) {
      console.error(error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) return <div className="text-center p-10">로딩 중...</div>;
  if (error) return <div className="text-center p-10 text-red-500">오류: {error}</div>;
  if (!post) return <div className="text-center p-10">게시글을 찾을 수 없습니다.</div>;

  const isAuthor = user?.userId === post.authorId;

  return (
    <div className="bg-white py-8 px-10 rounded-md shadow-md">
      <div className="border-b-2 border-gray-200 pb-4">
        <h1 className="text-3xl font-[700]">{post.title}</h1>
        <div className="flex justify-between items-center mt-4 text-gray-500">
          <span>작성자: {post.authorName}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="pt-8 pb-10 min-h-[200px] whitespace-pre-wrap">{post.content}</div>

      {/* 버튼 그룹 */}
      <div className="mt-2 flex justify-between items-center">
        <button
          onClick={() => navigate('/posts')}
          className="w-[10rem] p-3 rounded-md text-xl bg-white text-gray-600 border-2 border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white transition-all"
        >
          목록으로
        </button>
        {isAuthor && (
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/posts/${id}/edit`)}
              className="w-[10rem] p-3 rounded-md text-xl bg-white text-blue-600 border-2 border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition-all"
            >
              수정하기
            </button>
            <button
              onClick={handleDeletePost}
              className="w-[10rem] p-3 rounded-md text-xl bg-white text-red-600 border-2 border-red-600 cursor-pointer hover:bg-red-600 hover:text-white transition-all"
            >
              삭제하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
