import { Component, HostListener, Input } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { Router } from '@angular/router';

@Component({
  selector: 'dtp-config-menu',
  imports: [IconsModule],
  templateUrl: './config-menu.component.html',
})
export class ConfigMenuComponent {
  @Input() isOpen = false;

  options = [
    { label: 'Profile', icon: 'UserCircle' },
    { label: 'Help & Support', icon: 'BadgeQuestionMark' },
    { label: 'Log Out', icon: 'LogOut' },
  ];

  constructor(private router: Router) {}

  selectOption(option: string) {
    switch (option) {
      case 'Profile':
        this.router.navigate(['/profile']);
        break;
      case 'Help & Support':
        this.router.navigate(['/help']);
        break;
      case 'Log Out':
        this.logout();
        break;
      default:
        console.warn(`Unknown action: ${option}`);
    }
  }

  logout() {
    // this.authService.logout();
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-wrapper')) {
      this.isOpen = false;
    }
  }
}
