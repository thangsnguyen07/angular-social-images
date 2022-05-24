import { Comment } from './comment';

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  reactions: string[];
  comments: Comment[];
}
