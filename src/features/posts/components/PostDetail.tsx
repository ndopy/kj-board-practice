import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';
import { usePost } from '../hooks/usePost';
import { useDeletePost } from '../hooks/useDeletePost';
import { useToggleLike } from '../hooks/useToggleLike.ts';
import {
  PostActions,
  PostBody,
  PostError,
  PostHeader,
  PostLoading,
  PostNotFound,
  PostLikeButton
} from './PostUI';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { post, isLoading, error, setPost } = usePost(id, user?.userId);
  const { deletePost, isDeleting } = useDeletePost();
  const { isLiking, likeError, toggleLike } = useToggleLike({
    // post가 로드되기 전에는 undefined를 전달하여 훅 내부에서 처리하도록 함
    postId: post?._id,
    initialLikeCount: post?.likeCount,
    initialIsLikedByUser: post?.isLikedByUser,
    currentUserId: user?.userId,
    onUpdatePost: updatedFields => {
      setPost(prevPost => (prevPost ? { ...prevPost, ...updatedFields } : null));
    }
  });

  if (isLoading) return <PostLoading />;
  if (error) return <PostError error={error} />;
  if (!post) return <PostNotFound />;

  // id가 undefined일 수 없으므로, 확실히 해준다.
  const postId = id!;
  const isAuthor = user?.userId === post.authorId;

  const { title, authorName, createdAt, content, likeCount, isLikedByUser } = post;

  return (
    <div className="bg-white py-8 px-10 rounded-md shadow-md">
      <PostHeader title={title} authorName={authorName} createdAt={createdAt} />
      <PostBody content={content} />
      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <div className="flex items-center gap-2 text-gray-500">
          {/* 좋아요 에러 메시지 표시 */}
          {likeError && <p className="text-red-500 text-sm">{likeError}</p>}
        </div>
        <PostLikeButton
          likeCount={likeCount}
          isLikedByUser={isLikedByUser}
          onToggleLike={toggleLike}
          isLiking={isLiking}
        />
      </div>
      <PostActions
        isAuthor={isAuthor}
        postId={postId}
        onDelete={() => deletePost(postId)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
