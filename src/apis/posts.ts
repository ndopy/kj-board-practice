import type { Post, Meta, CreatePostPayload, UpdatePostPayload } from '@/types/post';

export interface PostsResponse {
  data: Post[];
  meta: Meta;
}

export const fetchPostsAPI = async (
  page: number,
  limit: number,
  currentUserId?: string
): Promise<PostsResponse> => {
  const url = new URL('http://localhost:3000/posts');
  url.searchParams.append('page', String(page));
  url.searchParams.append('limit', String(limit));
  if (currentUserId) url.searchParams.append('currentUserId', currentUserId);
  const response = await fetch(url.toString());

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

export const deletePostAPI = async (id: string): Promise<void> => {
  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('게시글 삭제에 실패했습니다.');
  }
  // 삭제 성공 시에는 보통 응답 본문이 없으므로, 별도의 반환 값은 없다.
  return;
};

export const toggleLikeAPI = async (
  postId: string
): Promise<{ likeCount: number; isLikedByUser: boolean }> => {
  const response = await fetch(`http://localhost:3000/posts/${postId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('좋아요 상태 변경에 실패했습니다.');
  }
  return response.json();
};

export const createPostAPI = async (postData: CreatePostPayload): Promise<Post> => {
  const response = await fetch(`http://localhost:3000/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    throw new Error('게시글 작성에 실패했습니다.');
  }

  return response.json();
};

export const searchPostsAPI = async (
  query: string,
  page: number,
  limit: number
): Promise<PostsResponse> => {
  const response = await fetch(
    `http://localhost:3000/posts/search?title=${query}&page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('게시글 검색에 실패했습니다.');
  }
  return response.json();
};
