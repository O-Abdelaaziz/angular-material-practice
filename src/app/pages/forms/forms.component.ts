import {Component, inject} from '@angular/core';
import {AngularMaterialModule} from '../../angular-material.module';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FieldErrorDirective} from '../../shared/directives/field-error.directive';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [AngularMaterialModule, ReactiveFormsModule, FieldErrorDirective],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  fb = inject(NonNullableFormBuilder);

  userForm = this.fb.group({
    // Personal Information
    firstName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    middleName: [''],
    lastName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    dateOfBirth: [new Date(), Validators.required],
    gender: ['male', Validators.required],
    email: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
    language: ['english'],

    // Address Information
    streetAddress: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(200)],
    ],
    apartmentUnit: [''],
    city: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    stateProvince: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    postalCode: ['', [Validators.required, Validators.minLength(5)]],
    country: ['us', Validators.required],
    timeZone: ['utc-5'],
    currency: ['usd'],
  });

  onSubmit() {
    this.userForm.markAllAsTouched();
  }
}
