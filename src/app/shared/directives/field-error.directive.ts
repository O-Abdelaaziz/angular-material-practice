import {Directive, ElementRef, inject, input} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[appFieldError]',
  standalone: true,
})
export class FieldErrorDirective {
  private formField = inject(MatFormField);
  private element = inject(ElementRef);

  customMessage = input<string>('');

  ngAfterViewInit() {
    const control = this.formField._formFieldControl.ngControl?.control;

    if (!control) {
      throw new Error(
        'FieldErrorDirective must be used with a form control within a mat-form-field'
      );
    }

    // Subscribe to status changes to update error message
    control.events.pipe(untilDestroyed(this)).subscribe(() => {
      if (control?.errors && (control.dirty || control.touched)) {
        const firstError = Object.keys(control.errors)[0];
        this.element.nativeElement.textContent = this.getErrorMessage(
          firstError,
          control.errors[firstError]
        );
      } else {
        this.element.nativeElement.textContent = '';
      }
    });
  }

  private getErrorMessage(errorKey: string, errorValue: any): string {
    // Default error messages
    const errorMessages: { [key: string]: string | ((error: any) => string) } =
      {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        min: (error) => `Value must be greater than or equal to ${error.min}`,
        max: (error) => `Value must be less than or equal to ${error.max}`,
        minlength: (error) =>
          `Must be at least ${error.requiredLength} characters`,
        maxlength: (error) =>
          `Cannot be more than ${error.requiredLength} characters`,
        pattern: 'Please enter a valid value',
      };

    const errorMessage = errorMessages[errorKey];
    if (typeof errorMessage === 'function') {
      return errorMessage(errorValue);
    }
    return errorMessage || 'Invalid value';
  }
}
