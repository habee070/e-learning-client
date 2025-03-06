'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginFormData } from '@/Types/auth';
import { authService } from '@/services/authService';

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      const response = await authService.login(formData)
      authService.saveToken(response.token)
      authService.saveUser(response)

      if (response.roleName === 'Training  Officer') {

        router.push('/instructor/instructor-dashboard')

      } else {

        router.push('/student/coursies')

      }

    } catch (error) {
      
      setError('ข้อมูลเข้าสู่ระบบไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')
      console.error('Login failed:', error)
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4 md:px-0">
      <div className="w-full max-w-sm md:max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">เข้าสู่ระบบ</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700" htmlFor="username">Username</label>
            <input
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text" id="username" placeholder="Username" required
              value={formData.username} onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="password">รหัสผ่าน</label>
            <input
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password" id="password" placeholder="••••••••" required
              value={formData.password} onChange={handleChange}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <label className="flex items-center">
              <input type="checkbox" className="text-blue-500 border-gray-300 rounded" />
              <span className="ml-2 text-gray-700 text-sm">จดจำฉัน</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">ลืมรหัสผ่าน?</a>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold">เข้าสู่ระบบ</button>
        </form>
        <p className="text-center text-gray-600 text-sm">ยังไม่มีบัญชี? <a href="#" className="text-blue-500 hover:underline">สมัครสมาชิก</a></p>
      </div>
    </div>
  );
}
