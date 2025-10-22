import { usePostEdit } from '@/features/posts/hooks/usePostEdit.ts';

interface PostEditFormProps {
  authorName: string;
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

function PostEditForm({
  authorName,
  title,
  content,
  onTitleChange,
  onContentChange
}: PostEditFormProps) {
  return (
    <ul className="pt-10 flex flex-col gap-8">
      <li>
        <div className="text-xl font-extrabold">작성자</div>
        <div className="py-3.5 border-b-1 border-b-gray-300">{authorName}</div>
      </li>
      <li>
        <div className="text-xl font-extrabold">제목</div>
        <div className="py-3.5">
          <input
            type="text"
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            className="w-full pt-1 pb-0.5 outline-none border-b-gray-300 border-b-1 focus:border-b-gray-500"
          />
        </div>
      </li>
      <li>
        <div className="text-xl font-extrabold">내용</div>
        <div className="py-3.5">
          <textarea
            value={content}
            onChange={e => onContentChange(e.target.value)}
            className="w-full h-40 p-3 resize-none outline-none border-1 border-gray-300 focus:border-gray-500"
          ></textarea>
        </div>
      </li>
    </ul>
  );
}

interface EditFormActionsProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function EditFormActions({ onConfirm, onCancel }: EditFormActionsProps) {
  return (
    <div className="mt-2 flex justify-end gap-8">
      <button
        onClick={onConfirm}
        className="w-[6rem] p-3 rounded-md text-lg bg-white text-blue-600 border-2 border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition-all"
      >
        수정하기
      </button>
      <button
        onClick={onCancel}
        className="w-[6rem] p-3 rounded-md text-lg bg-white text-gray-600 border-2 border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white transition-all"
      >
        취소
      </button>
    </div>
  );
}

export default function PostEdit() {
  const {
    post,
    title,
    content,
    isLoading,
    error,
    setTitle,
    setContent,
    handleEditPost,
    handleCancel
  } = usePostEdit();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>게시글 정보가 없습니다.</div>;

  return (
    <div className="bg-white py-8 px-10 rounded-md shadow-md">
      <h1 className="text-3xl font-[700]">글 수정하기</h1>
      <PostEditForm
        authorName={post.authorName}
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
      />
      <EditFormActions onConfirm={handleEditPost} onCancel={handleCancel} />
    </div>
  );
}
