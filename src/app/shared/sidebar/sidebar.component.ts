import { Component, EventEmitter, Input, type OnInit, Output } from "@angular/core"

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = false
  @Output() closeSidebar = new EventEmitter<void>()

  constructor() {}

  ngOnInit(): void {}

  onCloseSidebar(): void {
    this.closeSidebar.emit()
  }
}

