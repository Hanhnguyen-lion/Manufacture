import { DepartmentItem } from "./department"

export interface CompanyItem{
    id: string,
    code: string,
    name: string,
    description: string,
    country: string,
    address: string,
    phone: string,
    email: string
}
export interface CompanyDepartmentItem {
    id: string,
    code: string,
    name: string,
    description: string,
    country: string,
    address: string,
    phone: string,
    email: string
    departments:DepartmentItem[]
}