import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faArrowUpRightDots,
  faDownload,
  faHeart,
  faLink,
  faPencil,
  faSquareArrowUpRight,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  id!: string;
  post?: Post;
  imageHeight!: number;

  postSubscription!: Subscription;

  isLiked: boolean = false;
  isAuthor: boolean = false;
  isEdit: boolean = false;

  isLoading: boolean = true;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  getImageHeight(dom: any) {
    this.imageHeight = dom.clientHeight;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];

      this.postSubscription = this.postService
        .getPost(this.id)
        .subscribe(async (result) => {
          if (result) {
            const populatedPost: Post = await this.postService.populatePost(
              result
            );
            this.post = populatedPost;

            // Check if user is liked post

            this.post?.likes?.some(
              (userRef) => userRef.id == this.authService.currentUser?.uid
            )
              ? (this.isLiked = true)
              : (this.isLiked = false);

            // Check if user is author
            this.post?.author?.uid == this.authService.currentUser?.uid
              ? (this.isAuthor = true)
              : (this.isAuthor = false);

            this.isLoading = false;
          }
        });
    });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  handleDownload(): void {
    this.postService.downloadImage(this.post!.imageUrl, this.post!.title);
  }

  handleLikePost(): void {
    this.postService.likePost(this.post!, this.authService.currentUser!.uid);
  }

  handleEditPost(): void {
    this.isEdit = !this.isEdit;
  }

  viewImage(): void {
    window.open(this.post?.imageUrl);
  }

  downloadIcon = faDownload;
  copyIcon = faLink;
  heartIcon = faHeart;
  editIcon = faPencil;
  viewIcon = faSquareArrowUpRight;
}
