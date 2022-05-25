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
