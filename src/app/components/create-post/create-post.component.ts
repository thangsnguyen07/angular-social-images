import { Component, OnInit } from '@angular/core';
import { faClose, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  faUpload = faUpload;
  faClose = faClose;
}
