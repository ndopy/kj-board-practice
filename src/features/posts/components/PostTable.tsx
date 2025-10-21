import PostTableRow from './PostTableRow';
import type { Post } from '@/types/post.ts';

interface PostTableProps {
  posts: Post[];
}

export default function PostTable({ posts }: PostTableProps) {
  return (
    <table className="min-w-full table-fixed border-collapse rounded-md text-sm">
      <thead className="border-y-2 border-green-500">
        <tr>
          <th scope="col" className="w-[5%] p-2 text-left border-b border-slate-300">
            번호
          </th>
          <th scope="col" className="w-[50%] p-2 text-left border-b border-slate-300">
            제목
          </th>
          <th scope="col" className="w-[10%] p-2 text-left border-b border-slate-300">
            작성자
          </th>
          <th scope="col" className="w-[20%] p-2 text-left border-b border-slate-300">
            작성일
          </th>
          <th scope="col" className="w-[10%] p-2 text-center border-b border-slate-300">
            조회수
          </th>
          <th scope="col" className="w-[10%] p-2 text-center border-b border-slate-300">
            좋아요
          </th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <PostTableRow key={post._id} post={post} />
        ))}
      </tbody>
    </table>
  );
}
