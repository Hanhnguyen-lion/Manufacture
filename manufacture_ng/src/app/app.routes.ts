import { Routes } from '@angular/router';

import { CompanyList } from './components/companies/company-list';
import { EmployeeList } from './components/employees/employee-list';
import { DialogAnimationsExample } from './components/test/dialog-animations-example';

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
        path: "Test",
        component: DialogAnimationsExample
    }
];
