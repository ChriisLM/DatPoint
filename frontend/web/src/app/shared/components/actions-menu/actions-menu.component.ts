import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { IconsModule } from '../../icons/icons.module';

@Component({
  selector: 'dtp-actions-menu',
  imports: [IconsModule],
  templateUrl: './actions-menu.component.html',
})
export class ActionsMenuComponent {
  @Input() isOpen = false;
  @Output() actionSelected = new EventEmitter<string>();

  options = [
    { label: 'View', icon: 'Eye' },
    { label: 'Edit', icon: 'Pencil' },
    { label: 'Remove from favorites', icon: 'StarOff' },
    { label: 'Delete', icon: 'Trash' },
  ];

  selectOption(option: string) {
    this.actionSelected.emit(option);
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-wrapper')) {
      this.actionSelected.emit('close');
    }
  }
}
