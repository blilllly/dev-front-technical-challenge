import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should be render router-outlet', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should be render app-toaster', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-toaster')).toBeTruthy();
  });

  // it('should render title', async () => {
  //   const fixture = TestBed.createComponent(App);
  //   await fixture.whenStable();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, tcs-billy-alvear-dev-front');
  // });
});
