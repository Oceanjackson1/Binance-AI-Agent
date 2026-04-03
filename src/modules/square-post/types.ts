export interface SquarePost {
  postId: string;
  content: string;
  tags: string[];
  author: string;
  likes: number;
  comments: number;
  createTime: number;
}

export interface SquarePostCreateResult {
  postId: string;
  status: string;
}

export interface SquareFeedEntry {
  postId: string;
  content: string;
  tags: string[];
  author: string;
  likes: number;
  comments: number;
  createTime: number;
}

export interface SquareTrendingPost {
  postId: string;
  content: string;
  tags: string[];
  author: string;
  likes: number;
  trendScore: number;
}
