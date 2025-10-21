import { useNavigate } from 'react-router-dom';

export const PostLoading = () => <div className="text-center p-10">로딩 중...</div>;
export const PostError = ({ error }: { error: string }) => (
  <div className="text-center p-10 text-red-500">오류: {error}</div>
);
export const PostNotFound = () => (
  <div className="text-center p-10">게시글을 찾을 수 없습니다.</div>
);

interface PostHeaderProps {
  title: string;
  authorName: string;
  createdAt: string;
}

export const PostHeader = ({ title, authorName, createdAt }: PostHeaderProps) => (
  <div className="border-b-2 border-gray-200 pb-4">
    <h1 className="text-3xl font-[700]">{title}</h1>
    <div className="flex justify-between items-center mt-4 text-gray-500">
      <span>작성자: {authorName}</span>
      <span>{new Date(createdAt).toLocaleDateString()}</span>
    </div>
  </div>
);

export const PostBody = ({ content }: { content: string }) => (
  <div className="pt-8 pb-10 min-h-[200px] whitespace-pre-wrap">{content}</div>
);

interface PostActionsProps {
  isAuthor: boolean;
  postId: string;
  onDelete: () => void;
  isDeleting: boolean;
}

export const PostActions = ({ isAuthor, postId, onDelete, isDeleting }: PostActionsProps) => {
  const navigate = useNavigate();

  return (
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
            onClick={() => navigate(`/posts/${postId}/edit`)}
            className="w-[10rem] p-3 rounded-md text-xl bg-white text-blue-600 border-2 border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition-all"
          >
            수정하기
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="w-[10rem] p-3 rounded-md text-xl bg-white text-red-600 border-2 border-red-600 cursor-pointer hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? '삭제 중...' : '삭제하기'}
          </button>
        </div>
      )}
    </div>
  );
};
