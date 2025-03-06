import { NextRequest, NextResponse } from "next/server"
export async function middleware(request: NextRequest) {
    
    try{
        // หน้าเหล่านี้ไม่ต้องเช็คสถานะการล็อกอิน
        const isPublicPage =    request.nextUrl.pathname === "/" ||
                                request.nextUrl.pathname === "/login" 
        
        const token = request.cookies.get('token')?.value

        if(!isPublicPage && !token){
            return NextResponse.redirect(new URL('/login',request.nextUrl))
        }

        if(token){
            const userStr = request.cookies.get('user')?.value
            const user = userStr ? JSON.parse(userStr) : null
            const isTrainingOfficer = user.roleName === "Training  Officer";
            const isStudent = request.nextUrl.pathname.startsWith("/student")

            if(isTrainingOfficer){
                return NextResponse.next()
            }

            if(!isStudent){
                return NextResponse.redirect(new URL('/student/coursies',request.nextUrl))
            }

        }

        return NextResponse.next()
    }
    catch(error) {
        console.error("Error: ", error)
        return NextResponse.error()
    }
}
    export const config = {
        matcher: [
            '/',
            '/login',
            '/instructor/:path*',
            '/student/:path*'
        ]
}