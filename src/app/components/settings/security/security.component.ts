import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Validation from 'src/utils/utils';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: [
          '',
          [Validators.required, Validators.minLength(6)],
        ],
      },
      { validators: [Validation.match('newPassword', 'confirmNewPassword')] }
    );
  }

  handleSubmit() {
    if (this.passwordForm.valid) {
      this.authService.changePassword(
        this.f['currentPassword'].value,
        this.f['newPassword'].value
      );
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.passwordForm.controls;
  }
}
