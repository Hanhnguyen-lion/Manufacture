import { DepartmentItem } from "./department";

export interface EmployeeItem {
    id: string,
    company_id: string;
    department_id: string;
    company_name: string;
    department_name: string;
    code: string;
    name: string;
    job_title: string;
    hire_date: Date;
    employment_area: string;
    date_of_birth: Date;
    type_of_blood: string;
    place_of_birth: string;
    driving_licence: boolean;
    licences: boolean;
    address: string;
    phone_number: string;
    email: string;
    gender: string;
}
