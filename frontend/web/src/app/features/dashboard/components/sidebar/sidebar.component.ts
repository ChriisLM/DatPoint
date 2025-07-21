import { Component } from '@angular/core';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { SidebarNavegationComponent } from "./sidebar-navegation/sidebar-navegation.component";
import { SidebarUserComponent } from "./sidebar-user/sidebar-user.component";
import { AddButtonComponent } from "../../../../shared/components/add-button/add-button.component";

@Component({
  selector: 'dtp-sidebar',
  imports: [IconsModule, SidebarNavegationComponent, SidebarUserComponent, AddButtonComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent { }
