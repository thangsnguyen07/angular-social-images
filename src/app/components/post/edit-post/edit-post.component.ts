import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  @Input() post?: Post;

  isLoading: boolean = false;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {}

  handleClose() {
    this.onClose.emit();
  }

  async handleDelete() {
    this.isLoading = true;
    await this.postService.deletePost(this.post!.id);
    this.isLoading = false;

    this.router.navigateByUrl('/');
  }

  faClose = faXmark;
}
