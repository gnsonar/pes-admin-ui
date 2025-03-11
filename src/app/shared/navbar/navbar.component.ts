import { Component, EventEmitter, HostListener, type OnInit, Output } from "@angular/core"
import type { Router } from "@angular/router"
import type { AuthService } from "../../auth/auth.service"

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>()
  isProfileMenuOpen = false

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onToggleSidebar(): void {
    this.toggleSidebar.emit()
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent): void {
    // Close profile menu when clicking outside
    if (this.isProfileMenuOpen && !(event.target as HTMLElement).closest(".relative")) {
      this.isProfileMenuOpen = false
    }
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}

