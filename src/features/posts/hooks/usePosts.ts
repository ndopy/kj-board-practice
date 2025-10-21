import { useState, useEffect } from 'react';
import type { Meta, Post } from '@/types/post.ts';
import { fetchPostsAPI } from '@/apis/posts.ts';

const POSTS_PER_PAGE = 10;

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchPostsAPI(page, POSTS_PER_PAGE);
        setPosts(result.data);
        setMeta(result.meta);
      } catch (e) {
        setError(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [page]);

  return { posts, meta, loading, error, page, setPage };
};
