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
  isLikedByUser: boolean;
  likedBy?: string[];
  commentCount: number;
}

export interface Meta {
  total: number;
  page: number;
  last_page: number;
}

export type CreatePostPayload = Pick<Post, 'title' | 'content' | 'authorId' | 'authorName'>;
export type UpdatePostPayload = Pick<Post, 'title' | 'content'>;
