import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';
import { usePost } from '../hooks/usePost';
import { useDeletePost } from '../hooks/useDeletePost';
import {
  PostActions,
  PostBody,
  PostError,
  PostHeader,
  PostLoading,
  PostNotFound,
} from './PostUI';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { post, isLoading, error } = usePost(id);
  const { deletePost, isDeleting } = useDeletePost();

  if (isLoading) return <PostLoading />;
  if (error) return <PostError error={error} />;
  if (!post) return <PostNotFound />;

  // id가 undefined일 수 있으므로, 확실히 해준다.
  const postId = id!;
  const isAuthor = user?.userId === post.authorId;

  return (
    <div className="bg-white py-8 px-10 rounded-md shadow-md">
      <PostHeader title={post.title} authorName={post.authorName} createdAt={post.createdAt} />
      <PostBody content={post.content} />
      <PostActions
        isAuthor={isAuthor}
        postId={postId}
        onDelete={() => deletePost(postId)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
