import { Routes } from '@angular/router';

import { CompanyList } from './components/companies/company-list';
import { EmployeeList } from './components/employees/employee-list';
import { DialogAnimationsExample } from './components/test/dialog-animations-example';
import { DepartmentList } from './components/departments/department.list';
import { UserList } from './components/users/user-list';

export const routes: Routes = [
    {
        path: "Company",
        component: CompanyList
    },
    {
        path: "Employee",
        component: EmployeeList
    },
    {
        path: "Department",
        component: DepartmentList
    },
    {
        path: "User",
        component: UserList
    },
    {
        path: "Test",
        component: DialogAnimationsExample
    }
];
