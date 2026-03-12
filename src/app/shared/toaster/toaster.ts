import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToasterService } from './toaster-service';

@Component({
  selector: 'app-toaster',
  imports: [],
  templateUrl: './toaster.html',
  styleUrl: './toaster.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toaster {
  toasterService = inject(ToasterService);
}
