import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  editPostForm!: FormGroup;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    this.editPostForm = this.fb.group({
      title: [''],
      description: ['', Validators.maxLength(300)],
    });
  }

  ngOnInit(): void {
    this.editPostForm.patchValue({
      title: this.post?.title,
      description: this.post?.description,
    });
  }

  handleClose() {
    this.onClose.emit();
  }

  async handleDelete() {
    this.isLoading = true;
    await this.postService.deletePost(this.post!);
    this.isLoading = false;

    this.router.navigateByUrl('/');
  }

  handleSubmit() {
    if (this.editPostForm.valid) {
      this.postService.editPost(this.post!.id, this.editPostForm.value);

      // Close modal
      this.handleClose();
    }
  }

  get title() {
    return <FormControl>this.editPostForm.get('title');
  }

  get description() {
    return <FormControl>this.editPostForm.get('description');
  }

  faClose = faXmark;
}
