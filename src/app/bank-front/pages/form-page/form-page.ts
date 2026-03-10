import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'form-page',
  imports: [ReactiveFormsModule],
  templateUrl: './form-page.html',
  styleUrl: './form-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPage {
  private fb = inject(FormBuilder);

  myForm = this.fb.group({
    id: ['', Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    name: ['', Validators.required, Validators.minLength(5), Validators.maxLength(100)],
  })
}
