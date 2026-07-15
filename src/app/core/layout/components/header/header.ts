import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ToggleSidenavVisibilityComponent } from "./toggle-sidenav-visibility/toggle-sidenav-visibility.component";

@Component({
  selector: "app-header",
  imports: [MatToolbarModule, MatButtonModule, ToggleSidenavVisibilityComponent],
  templateUrl: "./header.html",
  styleUrl: "./header.scss",
})
export class Header {}
