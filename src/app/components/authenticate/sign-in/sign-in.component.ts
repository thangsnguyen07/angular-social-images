import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
        Validators.required,
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return <FormControl>this.signInForm.get('email');
  }
  get password() {
    return <FormControl>this.signInForm.get('password');
  }

  onSubmit() {
    this.authService.signIn(this.email.value, this.password.value);
  }

  faFacebook = faFacebook;
  faGoogle = faGoogle;
}
