import { Component } from '@angular/core';
import { IconsModule } from '../../../../../shared/icons/icons.module';
import { ConfigMenuComponent } from '../../../../../shared/components/config-menu/config-menu.component';

@Component({
  selector: 'dtp-sidebar-user',
  imports: [IconsModule, ConfigMenuComponent],
  templateUrl: './sidebar-user.component.html',
})
export class SidebarUserComponent { 
  menuOpen = false;
}
