import { usePosts } from '../hooks/usePosts.ts';
import Pagination from './Pagination';
import PostTable from './PostTable';

export default function PostList() {
  const { posts, meta, loading, error, page, setPage } = usePosts();

  if (loading) {
    return <div className="text-center p-10">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">에러: {error}</div>;
  }

  return (
    <div className="w-full mx-auto rounded-md bg-white p-4">
      <PostTable posts={posts} />
      {meta && <Pagination meta={meta} page={page} onPageChange={setPage} />}
    </div>
  );
}
