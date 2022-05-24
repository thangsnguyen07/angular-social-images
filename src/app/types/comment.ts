import { Reply } from './reply';

export interface Comment {
  id: string;
  content: string;
  userRef: string;
  createdAt: Date;
  replys: Reply[];
  reactions: string[];
}
