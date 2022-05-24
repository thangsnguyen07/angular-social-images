export interface Reply {
  id: string;
  content: string;
  userRef: string;
  createdAt: Date;
  reactions: string[];
}
