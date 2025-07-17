import { Component, signal } from '@angular/core';
import { IconsModule } from '../../../../../shared/icons/icons.module';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface workSpace {
  name: string;
}

@Component({
  selector: 'dtp-sidebar-navegation',
  imports: [IconsModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-navegation.component.html',
})
export class SidebarNavegationComponent {
  navigationItems = [
    { label: 'Home', icon: 'Home', route: '/dashboard' },
    { label: 'Recent', icon: 'Clock', route: '/dashboard/recent' },
    { label: 'Favorite', icon: 'Star', route: '/dashboard/favorite' },
  ];

  categoryItems = [
    { label: 'Link', icon: 'Link', route: '/dashboard/type/links' },
    { label: 'File', icon: 'FileText', route: '/dashboard/type/files' },
    { label: 'Image', icon: 'Image', route: '/dashboard/type/pictures' },
    { label: 'Video', icon: 'Video', route: '/dashboard/type/videos' },
  ];

  workSpaces = signal<workSpace[]>([
    // { name: 'workSpaces 1' },
    // { name: 'workSpaces 2' },
    // { name: 'workSpaces 3' },
  ]);
}
