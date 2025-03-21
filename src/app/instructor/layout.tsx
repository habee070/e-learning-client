import React from 'react'

export default function InstructorLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            {children}
        </div>
    )
}
