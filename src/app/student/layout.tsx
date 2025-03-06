import React from 'react'

export default function StudentLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            {children}
        </div>
    )
}
