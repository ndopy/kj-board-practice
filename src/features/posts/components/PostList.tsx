import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

// API 응답 데이터에 대한 타입 정의
interface Post {
  _id: string;
  title: string;
  authorName: string;
  createdAt: string;
  views: number;
  likeCount: number;
  commentCount: number;
}

export default function PostList() {
  // 게시글 목록, 로딩, 에러 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        if (!response.ok) {
          throw new Error('데이터를 불러오는 데 실패했습니다.');
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // 로딩 중 UI
  if (loading) {
    return <div className="text-center p-10">로딩 중...</div>;
  }

  // 에러 발생 시 UI
  if (error) {
    return <div className="text-center p-10 text-red-500">에러: {error}</div>;
  }

  return (
    <div className="w-full mx-auto rounded-md bg-white p-4">
      <table className="min-w-full table-fixed border-collapse rounded-md text-sm">
        <thead className="border-y-2 border-green-500">
          <tr>
            <th scope="col" className="w-[8%] p-3 text-left border-b border-slate-300">
              번호
            </th>
            <th scope="col" className="w-[40%] p-3 text-left border-b border-slate-300">
              제목
            </th>
            <th scope="col" className="w-[8%] p-3 text-left border-b border-slate-300">
              작성자
            </th>
            <th scope="col" className="w-[25%] p-3 text-left border-b border-slate-300">
              작성일
            </th>
            <th scope="col" className="w-[12%] p-3 text-center border-b border-slate-300">
              조회수
            </th>
            <th scope="col" className="w-[12%] p-3 text-center border-b border-slate-300">
              좋아요
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map(({ _id, title, authorName, createdAt, views, likeCount, commentCount }) => (
            <tr key={_id} className="border-b border-slate-300 hover:bg-slate-50 ">
              <td className="p-3 text-left border-b border-slate-300">{}</td>
              <td className="p-3 text-left border-b border-slate-300">
                <Link
                  to={`/posts/${_id}`}
                  className="flex items-center cursor-pointer hover:underline hover:font-[500]"
                >
                  {title}
                  {/* comments 및 아이콘 */}
                  <div className="flex items-center gap-0.5">
                    <ChatBubbleLeftIcon className="inline-block w-4 h-4 ml-2" />
                    <span className="text-gray-600">{commentCount}</span>
                  </div>
                </Link>
              </td>
              <td className="p-3 text-left border-b border-slate-300">{authorName}</td>
              <td className="p-3 text-left border-b border-slate-300">{createdAt}</td>
              <td className="p-3 text-center border-b border-slate-300">{views}</td>
              <td className="p-3 text-center border-b border-slate-300">{likeCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
