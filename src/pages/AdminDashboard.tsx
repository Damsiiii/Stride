"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import StatsCards from "@/components/admin/StatsCards"
import MembersPanel from "@/components/admin/MembersPanel"
import ContactsPanel from "@/components/admin/ContactsPanel"
import EventsPanel from "@/components/admin/EventsPanel"

type Tab = "members" | "contacts" | "events"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("members")

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <StatsCards />
      {activeTab === "members" && <MembersPanel />}
      {activeTab === "contacts" && <ContactsPanel />}
      {activeTab === "events" && <EventsPanel />}
    </AdminLayout>
  )
}
