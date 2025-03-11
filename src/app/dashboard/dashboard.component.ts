import { Component, type OnInit } from "@angular/core"

interface ActivityItem {
  userName: string
  userEmail: string
  userAvatar: string
  action: string
  date: string
  status: "Completed" | "Pending" | "Failed"
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  sidebarOpen = false
  recentActivity: ActivityItem[] = [
    {
      userName: "John Doe",
      userEmail: "john@example.com",
      userAvatar: "/placeholder.svg?height=40&width=40",
      action: "Created a new order",
      date: "2 hours ago",
      status: "Completed",
    },
    {
      userName: "Jane Smith",
      userEmail: "jane@example.com",
      userAvatar: "/placeholder.svg?height=40&width=40",
      action: "Updated profile information",
      date: "5 hours ago",
      status: "Completed",
    },
    {
      userName: "Mike Johnson",
      userEmail: "mike@example.com",
      userAvatar: "/placeholder.svg?height=40&width=40",
      action: "Requested a refund",
      date: "1 day ago",
      status: "Pending",
    },
    {
      userName: "Sarah Williams",
      userEmail: "sarah@example.com",
      userAvatar: "/placeholder.svg?height=40&width=40",
      action: "Attempted payment",
      date: "2 days ago",
      status: "Failed",
    },
  ]

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen
  }

  closeSidebar(): void {
    this.sidebarOpen = false
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
}

