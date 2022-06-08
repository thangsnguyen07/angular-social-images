import { DocumentReference } from '@angular/fire/compat/firestore';
import { CommentType } from './comment';
import { User } from './user';

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageId: string;
  createdAt: Date;
  userRef: DocumentReference;
  author?: User;
  likes?: DocumentReference[];
  comments?: CommentType[];
}
