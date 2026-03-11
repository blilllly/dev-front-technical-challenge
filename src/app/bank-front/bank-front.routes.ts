import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { FormPage } from './pages/form-page/form-page';

export const bankFrontRoutes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'register',
    component: FormPage,
  },
];

export default bankFrontRoutes;
