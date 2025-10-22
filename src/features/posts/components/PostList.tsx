import { usePosts } from '../hooks/usePosts.ts';
import Pagination from './Pagination';
import PostTable from './PostTable';

interface PostListProps {
  query: string;
}

export default function PostList({ query }: PostListProps) {
  const { posts, meta, loading, error, page, setPage } = usePosts(query);

  if (loading) {
    return <div className="text-center p-10">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">에러: {error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center p-10 text-gray-500">게시글이 없습니다.</div>;
  }

  return (
    <div className="w-full mx-auto rounded-md bg-white p-4">
      <PostTable posts={posts} />
      {meta && <Pagination meta={meta} page={page} onPageChange={setPage} />}
    </div>
  );
}
