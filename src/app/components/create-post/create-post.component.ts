import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faClose, faUpload } from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  isLoading: boolean = false;
  createPostForm!: FormGroup;
  imageSource!: string;

  imageError: boolean = false;

  constructor(public fb: FormBuilder, private postService: PostService) {
    this.createPostForm = this.fb.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
    });
  }

  ngOnInit(): void {
    this.postService.isLoading.subscribe((status) => {
      this.isLoading = status;
    });
  }

  get title() {
    return <FormControl>this.createPostForm.get('title');
  }

  get image() {
    return <FormControl>this.createPostForm.get('image');
  }

  get description() {
    return <FormControl>this.createPostForm.get('description');
  }

  faUpload = faUpload;
  faClose = faClose;

  submit() {
    if (this.createPostForm.valid) {
      this.postService.createPost(this.createPostForm.value);
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (this.isFileImage(file)) {
        this.createPostForm.patchValue({
          image: file,
        });
        this.createPostForm.get('image')?.updateValueAndValidity();
        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSource = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageError = true;
        this.resetImageError();
      }
    }
  }

  isFileImage(file: any) {
    return file && file['type'].split('/')[0] === 'image';
  }

  resetImageError() {
    setTimeout(() => (this.imageError = false), 3000);
  }
}
