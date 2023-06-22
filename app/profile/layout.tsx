'use client'

import ProfileDashboard from "@/components/ProfileDashboard"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <ProfileDashboard/>
      {children}
    </div>
  )
}