import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductTable } from './product-table';
import { provideRouter, Router } from '@angular/router';

describe('ProductTable', () => {
  let component: ProductTable;
  let fixture: ComponentFixture<ProductTable>;
  let router: Router;

  const routerMock = {
    navigate: vi.fn(),
  };

  const mockProducts = {
    data: [
      {
        id: '1',
        name: 'Producto 1',
        description: 'Descripcion 1',
        logo: 'logo1.png',
        date_release: '2026-01-01T00:00:00.000Z',
        date_revision: '2027-01-01T00:00:00.000Z',
      },
      {
        id: '2',
        name: 'Producto 2',
        description: 'Descripcion 2',
        logo: 'logo2.png',
        date_release: '2026-02-01T00:00:00.000Z',
        date_revision: '2027-02-01T00:00:00.000Z',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTable],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTable);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('products', mockProducts);

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should render products in the table', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(2);
  });

  it('should filter products by search query', () => {
    component.searchQuery.set('Producto 1');

    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(1);
  });

  it('should limit visible products by pageSize', () => {
    component.pageSize.set(1);

    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(1);
  });

  it('should show message when no products match search', () => {
    component.searchQuery.set('no-existe');

    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).toContain('No se encontraron productos');
  });

  it('should emit delete event', () => {
    const spy = vi.spyOn(component.deleteProduct, 'emit');

    component.deleteProduct.emit('1');

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('filteredProducts should return filtered list', () => {
    component.searchQuery.set('Producto 2');

    const result = component.filteredProducts();

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('2');
  });

  it('should navigate to edit page', () => {
    component.editProduct('1');

    expect(router.navigate).toHaveBeenCalledWith(['/edit', '1']);
  });
});
