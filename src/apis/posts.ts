import type { Meta, Post } from '@/types/post.ts';

export interface PostsResponse {
  data: Post[];
  meta: Meta;
}

export const fetchPostsAPI = async (page: number, limit: number): Promise<PostsResponse> => {
  const response = await fetch(`http://localhost:3000/posts?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }

  const result = await response.json();
  return result;
};
