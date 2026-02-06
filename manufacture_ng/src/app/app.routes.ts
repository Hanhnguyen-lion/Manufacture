import { Routes } from '@angular/router';

import { CompanyList } from './components/companies/company-list';
import { EmployeeList } from './components/employees/employee-list';
import { DialogAnimationsExample } from './components/test/dialog-animations-example';
import { DepartmentList } from './components/departments/department.list';
import { UserList } from './components/users/user-list';
import { Login } from './components/users/login';
import { AuthGuard } from './services/auth.guard';
import { Home } from './components/home/home';

export const routes: Routes = [
    {
        path: "",
        component: Home,
        canActivate:[AuthGuard]
    },
    {
        path: "Company",
        component: CompanyList,
        canActivate:[AuthGuard]
    },
    {
        path: "Employee",
        component: EmployeeList,
        canActivate:[AuthGuard]
    },
    {
        path: "Department",
        component: DepartmentList,
        canActivate:[AuthGuard]
    },
    {
        path: "User",
        component: UserList,
        canActivate:[AuthGuard]
    },
    {
        path: "Login",
        component: Login
    },
    {
        path: "Test",
        component: DialogAnimationsExample
    },
    { path: '**', redirectTo: '' }
];
