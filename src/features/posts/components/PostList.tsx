import { mockPostsData } from '../../../pages/mockPostsData.ts';
import { Link } from 'react-router-dom';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export default function PostList() {
  return (
    <div className="w-full mx-auto rounded-md bg-white p-4">
      <table className="min-w-full table-fixed border-collapse rounded-md text-sm">
        <thead className="border-y-2 border-green-500">
          <tr>
            <th scope="col" className="w-[5%] p-3 text-left border-b border-slate-300">
              번호
            </th>
            <th scope="col" className="w-[45%] p-3 text-left border-b border-slate-300">
              제목
            </th>
            <th scope="col" className="w-[10%] p-3 text-left border-b border-slate-300">
              작성자
            </th>
            <th scope="col" className="w-[15%] p-3 text-left border-b border-slate-300">
              작성일
            </th>
            <th scope="col" className="w-[15%] p-3 text-center border-b border-slate-300">
              조회수
            </th>
            <th scope="col" className="w-[15%] p-3 text-center border-b border-slate-300">
              좋아요
            </th>
          </tr>
        </thead>
        <tbody>
          {mockPostsData.map(post => (
            <tr key={post.id} className="border-b border-slate-300 hover:bg-slate-50 ">
              <td className="p-3 text-left border-b border-slate-300">{post.id}</td>
              <td className="p-3 text-left border-b border-slate-300">
                <Link
                  to={'#'}
                  className="flex items-center cursor-pointer hover:underline hover:font-[500]"
                >
                  {post.title}
                  {/* comments 및 아이콘 */}
                  <div className="flex items-center gap-0.5">
                    <ChatBubbleLeftIcon className="inline-block w-4 h-4 ml-2" />
                    <span className="text-gray-600">{post.comments}</span>
                  </div>
                </Link>
              </td>
              <td className="p-3 text-left border-b border-slate-300">{post.author}</td>
              <td className="p-3 text-left border-b border-slate-300">{post.createdAt}</td>
              <td className="p-3 text-center border-b border-slate-300">{post.views}</td>
              <td className="p-3 text-center border-b border-slate-300">{post.likes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
