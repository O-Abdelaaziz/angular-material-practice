import {Component, inject, signal} from '@angular/core';
import {AngularMaterialModule} from '../../angular-material.module';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AppStore} from '../../app.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading = signal(false);
  loginForm: FormGroup;
  togglePasswordVisibility = signal(true);
  appStore = inject(AppStore);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['jygawi@mailinator.com', [Validators.required, Validators.email]],
      password: ['01234560', Validators.required],
      rememberMe: false
    });
  }

  onSubmit(): void {
    this.isLoading.set(true);
    setTimeout(() =>
        this.login()
      , 50);

  }
  login() {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
      this.appStore.login();
      this.isLoading.set(false);
    }
  }
}
