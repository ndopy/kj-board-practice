import PostList from '../features/posts/components/PostList.tsx';

export default function PostsPage() {
  return (
    <div>
      <h1 className="">PostPage입니다.</h1>
      <div className="mt-4 rounded-md bg-white p-4">
        <PostList />
      </div>
    </div>
  );
}
