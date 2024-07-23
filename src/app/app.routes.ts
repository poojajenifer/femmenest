import { Route } from '@angular/router';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { StaffdashboardComponent } from './staffdashboard/staffdashboard.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';

export const AppRoutes: Route[] = [
    { path: '', component: TestComponent },
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: StaffdashboardComponent },
    { path: 'studentprofile', component: StudentprofileComponent },
    { path: 'adminportal', component: AdminpanelComponent },
];
