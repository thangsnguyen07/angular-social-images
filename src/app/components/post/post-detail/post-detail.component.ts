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
import { Subject, Subscription, takeUntil } from 'rxjs';
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

  // related posts
  relatedPosts: Post[] = [];
  relatedPostsSubscription = new Subject<void>();

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

          // related posts
          if (this.post?.keywords && this.post?.keywords.length > 0) {
            this.postService
              .getPostsByKeywords(this.post?.keywords)
              .pipe(takeUntil(this.relatedPostsSubscription))
              .subscribe((result) => {
                result.forEach(async (item) => {
                  if (item.type == 'added') {
                    // console.log('item: ', item.payload.doc.data(), item.type);
                    let relatedPost: Post = item.payload.doc.data() as Post;

                    // not include this post
                    if (relatedPost.id !== this.post?.id) {
                      relatedPost = await this.postService.populatePost(
                        relatedPost
                      );
                      this.relatedPosts.push(relatedPost);
                    }
                  }
                });
              });
          }
        });
    });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
    this.relatedPostsSubscription.next();
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
