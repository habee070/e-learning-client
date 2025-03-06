export interface LoginFormData {
    username: string
    password: string
}

export interface User {
    statusLogin: string | null;
    employeeID: string | null;
    employeeCode: string | null;
    fullName: string | null;
    departmentName: string | null;
    roleName: string | null;
    token: string ;
}