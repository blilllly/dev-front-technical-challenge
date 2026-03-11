import { Routes } from '@angular/router';
import { ListPage } from './pages/list-page/list-page';
import { FormPage } from './pages/form-page/form-page';
import { Dashboard } from './layouts/dashboard/dashboard';

export const bankFrontRoutes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: '',
        component: ListPage,
      },
      {
        path: 'register',
        component: FormPage,
      },
    ],
  },
];

export default bankFrontRoutes;
