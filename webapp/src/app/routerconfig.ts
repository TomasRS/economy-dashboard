import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: '', 
    component: HomeComponent 
  },
  { path: 'dashboard',
    component: DashboardComponent
  }
];
export default appRoutes;