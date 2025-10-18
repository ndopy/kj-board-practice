import { mockPostsData } from '../../../pages/mockPostsData.ts';
import { Link } from 'react-router-dom';

export default function PostList() {
  return (
    <div className="w-full mx-auto rounded-md bg-white p-4">
      <table className="min-w-full table-fixed border-collapse rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="w-[10%] p-3 text-left border-b border-slate-300">
              번호
            </th>
            <th scope="col" className="w-[50%] p-3 text-left border-b border-slate-300">
              제목
            </th>
            <th scope="col" className="w-[10%] p-3 text-left border-b border-slate-300">
              작성자
            </th>
            <th scope="col" className="w-[20%] p-3 text-left border-b border-slate-300">
              작성일
            </th>
            <th scope="col" className="w-[15%] p-3 text-left border-b border-slate-300">
              조회수
            </th>
          </tr>
        </thead>
        <tbody>
          {mockPostsData.map(post => (
            <tr key={post.id} className="border-b border-slate-300 hover:bg-slate-50 ">
              <td className="p-3 text-left border-b border-slate-300">{post.id}</td>
              <td className="p-3 text-left border-b border-slate-300">
                <Link to={'#'} className="cursor-pointer hover:underline hover:font-[500]">
                  {post.title}
                </Link>
              </td>
              <td className="p-3 text-left border-b border-slate-300">{post.author}</td>
              <td className="p-3 text-left border-b border-slate-300">{post.createdAt}</td>
              <td className="p-3 text-left border-b border-slate-300">{post.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
