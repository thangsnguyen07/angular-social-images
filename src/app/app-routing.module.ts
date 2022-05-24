import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/authenticate/sign-in/sign-in.component';
import { SignUpComponent } from './components/authenticate/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';

import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { PostComponent } from './components/post/post.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/']);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  {
    path: 'post',
    component: PostComponent,
    children: [{ path: ':id', component: PostDetailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
