import { Component, computed, inject, signal } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { LoggedInStoreService } from "@core/auth/stores/logged-in-store.service";
import { LogoutDirective } from "./directives/logout.directive";
import { SidenavVisibilityStore } from "@core/layout/stores/sidenav-visibility.store";

@Component({
  selector: "app-sidenav-items",
  imports: [MatListModule, RouterLink, RouterLinkActive, LogoutDirective],
  templateUrl: "./sidenav-items.component.html",
  styleUrl: "./sidenav-items.component.scss",
})
export class SidenavItemsComponent {
  private readonly loggedInUserStoreService = inject(LoggedInStoreService);
  private readonly sidenavVisibilityStore = inject(SidenavVisibilityStore);

  links = signal([
    {
      label: "Home",
      url: "/",
    },
  ]);

  isLoggedIn = computed(() => this.loggedInUserStoreService.isLoggedIn());

  closeSidenav() {
    this.sidenavVisibilityStore.close();
  }
}
