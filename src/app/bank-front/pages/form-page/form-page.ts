import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { ProductService } from '../../../products/services/product-service';
import { rxResource, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Datum } from '../../../products/interfaces/responseBP.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of } from 'rxjs';
import { ToasterService } from '../../../shared/toaster/toaster-service';

@Component({
  selector: 'form-page',
  imports: [ReactiveFormsModule],
  templateUrl: './form-page.html',
  styleUrl: './form-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private toasterService = inject(ToasterService);
  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  isEditMode = signal<boolean>(false);
  productId = signal<string | null>(null);

  minDate = signal<string>(this.getToday());

  //Obtener fecha actual para el minDate
  getToday(): string {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - offset * 60000);
    return localDate.toISOString().split('T')[0];
  }

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

  productResource = rxResource({
    params: () => ({ idSlug: this.productId() }),
    stream: ({ params }) => {
      if (!params.idSlug) return of(null);
      return this.productService.getProductById(params.idSlug);
    },
  });

  constructor() {
    this.listenReleaseDate();

    //llenar formulario en modo edición
    effect(() => {
      const product = this.productResource.value();

      if (!product) return;

      this.myForm.patchValue({
        id: product.id,
        name: product.name,
        description: product.description,
        logo: product.logo,
        date_release: new Date(product.date_release).toISOString().split('T')[0],
        date_revision: new Date(product.date_revision).toISOString().split('T')[0],
      });

      //disable el campo id en modo edición
      this.myForm.get('id')?.disable();
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.productId.set(id);
    this.isEditMode.set(!!id);
  }

  loadProduct(id: string) {}

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

    if (this.isEditMode()) {
      this.productService
        .updateProduct(this.productId()!, {
          id: formValue.id!,
          name: formValue.name!,
          description: formValue.description!,
          logo: formValue.logo!,
          date_release: new Date(formValue.date_release!),
          date_revision: new Date(formValue.date_revision!),
        })
        .subscribe({
          next: (response) => {
            this.toasterService.show(
              'Actualizado',
              'Producto actualizado correctamente',
              'success',
            );
            this.myForm.reset();
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.toasterService.show('Error', 'Error al actualizar el producto', 'danger');
            this.router.navigate(['/']);
          },
        });
      return;
    }

    this.productService
      .createProduct({
        id: formValue.id!,
        name: formValue.name!,
        description: formValue.description!,
        logo: formValue.logo!,
        date_release: new Date(formValue.date_release!),
        date_revision: new Date(formValue.date_revision!),
      })
      .subscribe({
        next: (response) => {
          this.toasterService.show('Creado', 'Producto creado correctamente', 'success');
          this.myForm.reset();
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.toasterService.show('Error', 'Error al crear el producto', 'danger');
          this.router.navigate(['/']);
        },
      });
  }

  onReset() {
    if (this.isEditMode()) {
      this.router.navigate(['/']);
    }
  }
}
