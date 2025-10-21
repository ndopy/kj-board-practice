export interface Post {
  no: number;
  _id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  views: number;
  likeCount: number;
  commentCount: number;
}

export interface Meta {
  total: number;
  page: number;
  last_page: number;
}

export type UpdatePostPayload = Pick<Post, 'title' | 'content'>;
