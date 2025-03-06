import { LoginFormData, User } from "@/Types/auth";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {

    async login(credentials: LoginFormData): Promise<User> {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (!res.ok)  throw new Error('Login failed!');

        return res.json();
    },

    saveToken(token: string): void {
        Cookies.set('token', token,{
            secure:process.env.NODE_ENV === 'production',
            expires: 1,
            path: '/'
        });
    },

    saveUser(user: User) {
        Cookies.set('user', JSON.stringify(user),{
            secure:process.env.NODE_ENV === 'production',
            expires: 1,
            path: '/'
        })
    },

    getUser(): User | null {
        const userStr = Cookies.get('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    clearAuth(): void{
        Cookies.remove('token');
        Cookies.remove('user'); 
    }

}