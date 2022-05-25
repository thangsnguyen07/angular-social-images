import { Component, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-comment-item',
  templateUrl: './post-comment-item.component.html',
  styleUrls: ['./post-comment-item.component.scss'],
})
export class PostCommentItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  heartIcon = faHeart;
}
