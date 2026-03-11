import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { ProductService } from '../products/services/product-service';
import { catchError, map, Observable, of } from 'rxjs';

export class FormUtils {
  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Este campo requiere un mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'maxlength':
          return `Este campo requiere un máximo de ${errors['maxlength'].requiredLength} caracteres.`;

        case 'idExists':
          return `Este id ya está en uso`;

        default:
          return `Error de validación no controlado. ${key}`;
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);
  }

  static idExistValidator(productService: ProductService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      return productService.verifyId(control.value).pipe(
        map((exists) => (exists ? { idExists: true } : null)),
        catchError(() => of(null)),
      );
    };
  }
}
