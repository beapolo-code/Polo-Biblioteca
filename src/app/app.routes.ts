import { Route } from '@angular/router';
import { AdminLayout } from '@/app/domains/admin/layout/layout';

export const routes: Route[] = [
  {
    path: 'pages',
    component: AdminLayout,
    children: [
      {
        path: 'my-route',
        loadComponent: () => import('@/app/pages/my-component/my-component').then(m => m.MyComponent),
      },
      {
        path: 'books',
        loadChildren: () => import('@/app/pages/book-management/routes'),
      },
    ],
  },

  // Website routes
  {
    path: 'home',
    loadChildren: () => import('./domains/website/routes'),
  },

  // Auth
  {
    path: 'auth',
    loadChildren: () => import('./domains/auth/routes'),
  },

  // Admin
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin',
  },

  {
    path: 'admin',
    loadChildren: () => import('./domains/admin/routes'),
  },

  // Coming soon
  {
    path: 'coming-soon',
    loadChildren: () => import('./domains/coming-soon/routes'),
  },

  // Maintenance
  {
    path: 'maintenance',
    loadChildren: () => import('./domains/maintenance/routes'),
  },
];