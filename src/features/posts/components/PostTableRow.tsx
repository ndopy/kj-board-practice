import { Link } from 'react-router-dom';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import type { Post } from '@/types/post.ts';

interface PostTableRowProps {
  post: Post;
}

export default function PostTableRow({ post }: PostTableRowProps) {
  const { no, _id, title, authorName, createdAt, views, likeCount, commentCount } = post;

  return (
    <tr className="border-b border-slate-300 hover:bg-slate-50 ">
      <td className="p-2 text-left">{no}</td>
      <td className="p-2 text-left">
        <Link
          to={`/posts/${_id}`}
          className="flex items-center cursor-pointer hover:underline hover:font-[500]"
        >
          {title}
          <div className="flex items-center gap-0.5 ml-2">
            <ChatBubbleLeftIcon className="inline-block w-4 h-4" />
            <span className="text-gray-600">{commentCount}</span>
          </div>
        </Link>
      </td>
      <td className="p-2 text-left">{authorName}</td>
      <td className="p-2 text-left">{createdAt}</td>
      <td className="p-2 text-center">{views}</td>
      <td className="p-2 text-center">{likeCount}</td>
    </tr>
  );
}
