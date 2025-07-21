import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Resource } from '../../interfaces/dashboard.interface';
import { NgClass } from '@angular/common';
import { ActionsMenuComponent } from '../../../../shared/components/actions-menu/actions-menu.component';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { TimeAgoPipe } from '../../../../shared/pipes/timeAgo.pipe';

@Component({
  selector: 'dtp-card-list-resource',
  imports: [NgClass, IconsModule, ActionsMenuComponent, TimeAgoPipe],
  templateUrl: './card-list-resource.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListResourceComponent { 
  @Input() resource!: Resource;
  @Input() selectedResources: string[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  showFallback = false;
  menuOpen = false;

  // Handle menu options
  handleAction(action: string) {
    if (action === 'close') {
      this.menuOpen = false;
      return;
    }
    console.log('Resource ID:', this.resource.id);
    console.log('Acción:', action);
    this.menuOpen = false;
  }

  toggleSelection(): void {
    this.selectionChange.emit(this.resource.id);
  }

  //Gets Conditional Styles
  get isSelected(): boolean {
    return this.selectedResources.includes(this.resource.id);
  }

  get checkboxClasses(): { [key: string]: boolean } {
    return {
      'h-5 w-5 rounded-md border-2 backdrop-blur-sm transition-colors': true,
      'bg-blue-500': this.isSelected,
      'bg-background/90': !this.isSelected,
    };
  }

  get imageClasses(): { [key: string]: boolean } {
    return {
      'h-full w-full object-cover': true,
      hidden: this.showFallback,
    };
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  getWorkspaceBadgeColor(workspace: string): string {
    const colors: { [key: string]: string } = {
      personal: 'bg-blue-400/45 text-blue-300',
      work: 'bg-green-400/45 text-green-300',
      project: 'bg-purple-400/45 text-purple-300',
      default: 'bg-gray-400/45 text-gray-300',
    };
    return colors[workspace] || colors['default'];
  }

  getWorkspaceLabel(workspace: string): string {
    const labels: { [key: string]: string } = {
      personal: 'Personal',
      work: 'Trabajo',
      project: 'Proyecto',
    };
    return labels[workspace] || workspace;
  }

  getResourceIcon(type: string): { name: string; class: string } {
    const icons: { [key: string]: { name: string; class: string } } = {
      document: { name: 'FileText', class: 'h-8 w-8 text-blue-500 drop-shadow-sm' },
      file: { name: 'FileText', class: 'h-8 w-8 text-blue-500 drop-shadow-sm' },
      files: { name: 'FileText', class: 'h-8 w-8 text-blue-500 drop-shadow-sm' },
      link: { name: 'Link', class: 'h-8 w-8 text-green-500 drop-shadow-sm' },
      links: { name: 'Link', class: 'h-8 w-8 text-green-500 drop-shadow-sm' },
      image: { name: 'Image', class: 'h-8 w-8 text-purple-500 drop-shadow-sm' },
      picture: { name: 'Image', class: 'h-8 w-8 text-purple-500 drop-shadow-sm' },
      pictures: { name: 'Image', class: 'h-8 w-8 text-purple-500 drop-shadow-sm' },
      video: { name: 'Video', class: 'h-8 w-8 text-red-500 drop-shadow-sm' },
      videos: { name: 'Video', class: 'h-8 w-8 text-red-500 drop-shadow-sm' },
    };
    const normalizedType = type.toLowerCase();
    return icons[normalizedType] || icons['document'];
  }
}
