import { Routes } from '@angular/router';

import { CompanyList } from './components/companies/company-list';
import { EmployeeList } from './components/employees/employee-list';

export const routes: Routes = [
    {
        path: "Company",
        component: CompanyList
    },
    {
        path: "Employee",
        component: EmployeeList
    }
];
