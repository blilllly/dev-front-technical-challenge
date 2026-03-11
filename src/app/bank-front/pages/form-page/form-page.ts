import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { ProductService } from '../../../products/services/product-service';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Datum } from '../../../products/interfaces/responseBP.interface';

@Component({
  selector: 'form-page',
  imports: [ReactiveFormsModule],
  templateUrl: './form-page.html',
  styleUrl: './form-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPage {
  minDate = signal<string>(this.getToday());

  //Obtener fecha actual para el minDate
  getToday(): string {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - offset * 60000);
    return localDate.toISOString().split('T')[0];
  }

  formUtils = FormUtils;
  productService = inject(ProductService);

  private fb = inject(FormBuilder);

  myForm = this.fb.group({
    id: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      this.formUtils.idExistValidator(this.productService),
    ],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', Validators.required],
    date_release: ['', Validators.required],
    date_revision: [{ value: '', disabled: true }, Validators.required],
  });

  constructor() {
    this.listenReleaseDate();
  }

  private listenReleaseDate() {
    this.myForm
      .get('date_release')
      ?.valueChanges.pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (!value) return;

        const releaseDate = new Date(value);
        const revisionDate = new Date(releaseDate);

        // sumar 1 año
        revisionDate.setFullYear(releaseDate.getFullYear() + 1);

        const formatted = revisionDate.toISOString().split('T')[0];

        this.myForm.patchValue({
          date_revision: formatted,
        });
      });
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const formValue = this.myForm.getRawValue();

    this.productService.createProduct({
      id: formValue.id!,
      name: formValue.name!,
      description: formValue.description!,
      logo: formValue.logo!,
      date_release: new Date(formValue.date_release!),
      date_revision: new Date(formValue.date_revision!),
    }).subscribe({
      next: (response) => {
        console.log('Producto creado:', response);
        this.myForm.reset();
      },
      error: (error) => {
        console.error('Error al crear el producto:', error);
      },
    })
  }
}
