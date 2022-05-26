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
import { ProfileComponent } from './components/profile/profile.component';
import { PostCreatedComponent } from './components/profile/post-created/post-created.component';
import { PostLikedComponent } from './components/profile/post-liked/post-liked.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditProfileComponent } from './components/settings/edit-profile/edit-profile.component';
import { SecurityComponent } from './components/settings/security/security.component';

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
  {
    path: 'profile',
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: ':username',
        component: ProfileComponent,
        children: [
          { path: 'created', component: PostCreatedComponent },
          { path: 'liked', component: PostLikedComponent },

          { path: '**', redirectTo: 'created', pathMatch: 'full' },
        ],
      },
    ],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'security', component: SecurityComponent },

      { path: '**', redirectTo: 'edit-profile', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
