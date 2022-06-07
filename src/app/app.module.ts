import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/authenticate/sign-in/sign-in.component';
import { SignUpComponent } from './components/authenticate/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// AUTO GENERATE
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostService } from './services/post.service';

import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostComponent } from './components/post/post.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';
import { AutosizeModule } from 'ngx-autosize';
import { PostComment } from './components/post/post-detail/post-comment/post-comment.component';
import { PostCommentItemComponent } from './components/post/post-detail/post-comment/post-comment-item/post-comment-item.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationCardComponent } from './components/notification/notification-card/notification-card.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostCreatedComponent } from './components/profile/post-created/post-created.component';
import { PostLikedComponent } from './components/profile/post-liked/post-liked.component';
import { FollowersPopupComponent } from './components/profile/followers-popup/followers-popup.component';
import { FollowerCardComponent } from './components/profile/followers-popup/follower-card/follower-card.component';
import { PostCreatedCardComponent } from './components/profile/post-created/post-created-card/post-created-card.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditProfileComponent } from './components/settings/edit-profile/edit-profile.component';
import { SecurityComponent } from './components/settings/security/security.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    NavBarComponent,
    PostCardComponent,
    PostComponent,
    PostDetailComponent,
    PostComment,
    PostCommentItemComponent,
    NotificationComponent,
    NotificationCardComponent,
    ProfileComponent,
    PostCreatedComponent,
    PostLikedComponent,
    FollowersPopupComponent,
    FollowerCardComponent,
    PostCreatedCardComponent,
    SettingsComponent,
    EditProfileComponent,
    SecurityComponent,
    CreatePostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // AUTO GENERATE
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

    FontAwesomeModule,

    NgxMasonryModule,
    BrowserAnimationsModule,
    // Auto resize input
    AutosizeModule,
  ],
  providers: [AuthService, PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}
