import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToasterService } from '../../shared/toaster/toaster-service';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toasterService = inject(ToasterService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Ocurrió un error inesperado';

      if (error.status === 0) {
        message = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión.';
      } else if (error.status >= 400 && error.status < 500) {
        message =
          error.error?.message ||
          'Ocurrió un error en la solicitud. Por favor, verifica los datos ingresados.';
      } else if (error.status >= 500) {
        message = 'Ocurrió un error en el servidor. Por favor, intenta nuevamente más tarde.';
      }

      toasterService.show('Error', message, 'danger');

      return throwError(() => error);
    }),
  );
};
