import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes = [
    { path: '', component: CustomerListComponent, canActivate: [AuthGuard] },    
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
]

export const routing = RouterModule.forRoot(appRoutes);