import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { User } from '@/contexts/AuthContext';

interface PostFormProps {
  user: User;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function PostForm({
  user,
  title,
  setTitle,
  content,
  setContent,
  onSubmit,
  onCancel
}: PostFormProps) {
  return (
    <div className="bg-white py-8 px-10 rounded-md shadow-md">
      <h1 className="text-3xl font-[700]">글 쓰기</h1>
      <ul className="pt-10 flex flex-col gap-8">
        <li>
          <div className="text-xl font-extrabold">작성자</div>
          <div className="py-3.5 border-b-1 border-b-gray-300">{user.name}</div>
        </li>
        <li>
          <div className="text-xl font-extrabold">제목</div>
          <div className="py-3.5">
            <input
              type="text"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              className="w-full pt-1 pb-0.5 outline-none border-b-gray-300 border-b-1 focus:border-b-gray-500"
              placeholder="제목을 입력하세요"
            />
          </div>
        </li>
        <li>
          <div className="text-xl font-extrabold">내용</div>
          <div className="py-3.5">
            <textarea
              value={content}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              className="w-full h-40 p-3 resize-none outline-none border-1 border-gray-300 focus:border-gray-500"
              placeholder="내용을 입력하세요"
            ></textarea>
          </div>
        </li>
      </ul>
      <div className="mt-2 flex justify-end gap-8">
        <button
          onClick={onSubmit}
          className="w-[8rem] p-2 rounded-md text-xl bg-white text-green-600 border-2 border-green-600 cursor-pointer hover:bg-green-600 hover:text-white transition-all"
        >
          작성하기
        </button>
        <button
          onClick={onCancel}
          className="w-[8rem] p-2 rounded-md text-xl bg-white text-gray-600 border-2 border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white transition-all"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
