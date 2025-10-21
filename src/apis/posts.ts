import type { Meta, Post, UpdatePostPayload } from '@/types/post.ts';

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

export const fetchPostAPI = async (id: string): Promise<Post> => {
  const response = await fetch(`http://localhost:3000/posts/${id}`);
  if (!response.ok) {
    throw new Error('게시글을 불러오는 데 실패했습니다.');
  }
  return response.json();
};

export const updatePostAPI = async (id: string, postData: UpdatePostPayload): Promise<Post> => {
  console.log(postData);
  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    throw new Error('게시글 수정에 실패했습니다.');
  }
  // 성공 응답에 본문이 없을 수 있으므로, 본문이 있는 경우에만 json()을 호출합니다.
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }
  return {} as Post; // 혹은 다른 적절한 기본값
};
