import { TestBed } from '@angular/core/testing';
import { ToasterService } from './toaster-service';

describe('ToasterService', () => {
  let service: ToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterService);
  });

  it('should create a toast', () => {
    service.show('Title', 'Description', 'success');

    const toasts = service.toasts();

    expect(toasts.length).toBe(1);
    expect(toasts[0].title).toBe('Title');
    expect(toasts[0].description).toBe('Description');
    expect(toasts[0].type).toBe('success');
  });

  it('should assign incremental ids', () => {
    service.show('A', 'A');
    service.show('B', 'B');

    const toasts = service.toasts();

    expect(toasts[0].id).toBe(0);
    expect(toasts[1].id).toBe(1);
  });

  it('should close a toast', () => {
    service.show('Title', 'Description');

    const toast = service.toasts()[0];

    service.close(toast.id);

    expect(service.toasts().length).toBe(0);
  });

  it('should not fail if toast does not exist', () => {
    service.close(999);

    expect(service.toasts().length).toBe(0);
  });

  it('should auto close toast', () => {
    vi.useFakeTimers();

    service.show('Title', 'Description', 'info', 3000);

    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(3000);

    expect(service.toasts().length).toBe(0);

    vi.useRealTimers();
  });

  it('toast should start open', () => {
    service.show('Title', 'Description');

    const toast = service.toasts()[0];

    expect(toast.isOpen()).toBe(true);
  });

  it('should update the toasts signal when a toast is added', () => {
    expect(service.toasts().length).toBe(0);

    service.show('Title', 'Description');

    expect(service.toasts().length).toBe(1);
  });

  it('should remove toast when close is called', () => {
    service.show('Title', 'Description');

    const toastId = service.toasts()[0].id;

    service.close(toastId);

    expect(service.toasts().length).toBe(0);
  });

  it('should automatically close toast after timeout', () => {
    vi.useFakeTimers();

    service.show('Title', 'Description', 'info', 3000);

    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(3000);

    expect(service.toasts().length).toBe(0);

    vi.useRealTimers();
  });
});
