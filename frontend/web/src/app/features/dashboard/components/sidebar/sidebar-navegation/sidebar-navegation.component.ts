import { Component, signal } from '@angular/core';
import { IconsModule } from '../../../../../shared/icons/icons.module';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'dtp-sidebar-navegation',
  imports: [IconsModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-navegation.component.html',
})
export class SidebarNavegationComponent { 
  navigationItems = [
    { label: 'Home', icon: 'Home', route: '/dashboard' },
    { label: 'Recent', icon: 'Clock', route: '/dashboard/recent' },
    { label: 'Favorite', icon: 'Star', route: '/dashboard/favorite' }
  ];

  categoryItems = [
    { label: 'Link', icon: 'Link', route: '/dashboard/links' },
    { label: 'File', icon: 'FileText', route: '/dashboard/files' },
    { label: 'Image', icon: 'Image', route: '/dashboard/pictures' },
    { label: 'Video', icon: 'Video', route: '/dashboard/videos' }
  ];

  workspaces = signal([
    { name: 'Workspace 1' },
    { name: 'Workspace 2' },
    { name: 'Workspace 3' },
    { name: 'Workspace 4' },
  ]);
}
