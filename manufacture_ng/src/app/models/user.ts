import { DepartmentItem } from "./department";

export interface UserItem {
    id: string,
    password: string,
    first_name: string,
    last_name: string,
    dob: Date,
    gender: string,
    address: string,
    phone: string,
    email: string,
    role: string,
    account_type: string,
    company_id: string,
    company_code: string,
    company_name: string,
    token: string
}
