import { DocumentReference } from '@angular/fire/compat/firestore';
import { CommentType } from './comment';

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  userRef: DocumentReference;
  likes: DocumentReference[];
  comments: Comment[];
}
