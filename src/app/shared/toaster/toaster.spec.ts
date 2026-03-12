import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Toaster } from './toaster';
import { ToasterService } from './toaster-service';

describe('Toaster', () => {
  let fixture: ComponentFixture<Toaster>;
  let component: Toaster;
  let toasterService: ToasterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toaster],
    }).compileComponents();

    fixture = TestBed.createComponent(Toaster);
    component = fixture.componentInstance;
    toasterService = TestBed.inject(ToasterService);
  });

  it('should render a toast when service adds one', () => {
    toasterService.show('Test title', 'Test description', 'success');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const title = compiled.querySelector('.toaster-title');
    const description = compiled.querySelector('.toaster-description');

    expect(title?.textContent).toContain('Test title');
    expect(description?.textContent).toContain('Test description');
  });

  it('should apply the correct toast type class', () => {
    toasterService.show('Title', 'Description', 'danger');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toaster = compiled.querySelector('.toaster');

    expect(toaster?.classList).toContain('danger');
  });

  it('should remove toast when closed', () => {
    toasterService.show('Title', 'Description');

    fixture.detectChanges();

    const toastId = toasterService.toasts()[0].id;

    toasterService.close(toastId);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toast = compiled.querySelector('.toaster');

    expect(toast).toBeNull();
  });
});
