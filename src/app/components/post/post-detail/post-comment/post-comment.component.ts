import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { CommentType } from 'src/app/types/comment';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
})
export class PostComment implements OnInit {
  @Input() postId?: string;

  comments: CommentType[] = [];

  commentContent: string = '';
  isShowControlBox = false;
  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.postId = params['id'];
      this.postService
        .getPostComments(this.postId!)
        .subscribe((result: any[]) => {
          if (result) {
            result.forEach(async (item: CommentType) => {
              let comment: CommentType = item;

              let author: User = await this.commentService.getCommentAuthor(
                item.userRef
              );
              comment.author = author;
              this.comments.push(comment);
            });
          }
        });
    });
  }

  onFocus(value: boolean) {
    this.isShowControlBox = value;
  }

  sendComment() {
    console.log(this.commentContent);
  }

  clearCommentContent() {
    this.commentContent = '';
  }
}
