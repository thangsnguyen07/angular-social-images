import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  editUserForm!: FormGroup;
  currentUser!: User;
  userSubscription!: Subscription;

  imageSource?: string;
  editAvatar: any;
  imageError: boolean = false;

  isFetching: boolean = true;
  isLoading: boolean = false;

  _username: string = '';
  isUsernameExist: boolean = false;

  constructor(
    private authService: AuthService,
    private utilService: UtilService,
    private fb: FormBuilder
  ) {
    this.editUserForm = this.fb.group({
      image: [''],
      displayName: [''],
      bio: ['', Validators.maxLength(300)],
      username: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.userObserver.subscribe(
      (userResult: User) => {
        if (userResult) {
          this.currentUser = userResult;

          // display avatar
          this.imageSource = userResult.avatar;

          // current username
          this._username = userResult.username;

          this.editUserForm.patchValue({
            displayName: userResult.displayName ?? '',
            bio: userResult.bio ?? '',
            username: userResult.username,
          });

          // Fetch done
          this.isFetching = false;
        }
      }
    );
  }

  handleSubmit() {
    if (this.editUserForm.valid) {
      const editUserData: EditUserData = this.editUserForm.value;

      if (editUserData.username != this._username) {
        this.authService
          .getUserByUsername(editUserData.username)
          .pipe(take(1))
          .subscribe((res) => {
            // user exist => username exist
            if (res[0]) {
              this.isUsernameExist = true;

              // hide error
              setTimeout(() => {
                this.isUsernameExist = false;
              }, 3000);
              return;
            }

            this.authService.updateUser(editUserData);
          });
      } else {
        this.authService.updateUser(editUserData);
      }
    }
  }

  get displayName() {
    return <FormControl>this.editUserForm.get('displayName');
  }

  get bio() {
    return <FormControl>this.editUserForm.get('bio');
  }
  get username() {
    return <FormControl>this.editUserForm.get('username');
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (this.utilService.isFileImage(file)) {
        this.editUserForm.patchValue({
          image: file,
        });
        this.editUserForm.get('image')?.updateValueAndValidity();
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

  resetImageError() {
    setTimeout(() => (this.imageError = false), 3000);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}

interface EditUserData {
  image?: File;
  displayName?: string;
  bio?: string;
  username: string;
}
