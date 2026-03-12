import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  output,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'delete-dialog',
  imports: [],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialog {
  @ViewChild('deleteDialog') deleteDialog!: ElementRef<HTMLDialogElement>;

  productId = signal<string>('');
  productName = signal<string>('');

  deleted = output<string>();

  show(id: string, name: string) {
    this.productId.set(id);
    this.productName.set(name);
    this.deleteDialog.nativeElement.showModal();
  }

  cancel() {
    this.deleteDialog.nativeElement.close();
  }

  delete() {
    const id = this.productId();
    if (!id) return;
    this.deleted.emit(id);
    this.deleteDialog.nativeElement.close();
  }
}
