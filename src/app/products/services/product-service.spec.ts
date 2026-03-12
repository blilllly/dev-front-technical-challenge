import { TestBed } from '@angular/core/testing';
import { ProductService } from './product-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService, provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    const mockResponse = { data: [] };

    service.getProducts().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/bp/products');

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should verify id', () => {
    const id = 'uno';

    service.verifyId(id).subscribe((res) => {
      expect(res).toBe(true);
    });

    const req = httpMock.expectOne(`/bp/products/verification/${id}`);

    expect(req.request.method).toBe('GET');

    req.flush(true);
  });

  it('should create product', () => {
    const product = {
      id: 'uno',
      name: 'Producto',
      description: 'Test',
      logo: 'logo.png',
      date_release: new Date(),
      date_revision: new Date(),
    };

    service.createProduct(product).subscribe();

    const req = httpMock.expectOne('/bp/products');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(product);

    req.flush({});
  });

  it('should update product', () => {
    const id = 'uno';

    const product = {
      id: 'uno',
      name: 'Updated',
      description: 'Test',
      logo: 'logo.png',
      date_release: new Date(),
      date_revision: new Date(),
    };

    service.updateProduct(id, product).subscribe();

    const req = httpMock.expectOne(`/bp/products/${id}`);

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(product);

    req.flush({});
  });

  it('should delete product', () => {
    const id = 'uno';

    service.deleteProduct(id).subscribe();

    const req = httpMock.expectOne(`/bp/products/${id}`);

    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });

  it('should handle error', () => {
    service.getProducts().subscribe({
      next: () => {
        throw new Error('should fail');
      },
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne('/bp/products');

    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});
