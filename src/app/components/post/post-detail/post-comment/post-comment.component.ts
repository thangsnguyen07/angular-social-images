import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
})
export class PostComment implements OnInit {
  @Input() post: any;

  commentContent: string = '';
  isShowControlBox = false;
  constructor() {}

  ngOnInit(): void {}

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
