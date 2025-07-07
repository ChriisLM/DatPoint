import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '../../../../shared/icons/icons.module';

interface Resource {
  id: string;
  created_by: string;
  created_at: string;
  updated_at?: string; //no en uso
  title: string;
  description?: string;
  type: string;
  format?: string; //no en uso
  file_path?: string;
  link_url?: string;
  metadata?: { [key: string]: any };
  tags: string[];
  is_public?: boolean; //no en uso
  priority?: 'low' | 'normal' | 'high';
  // nuevos aqui
  thumbnail?: string;
  workspace: string;
  size: string | 'N/A';
  favorite: boolean;
}

@Component({
  selector: 'dtp-card-resource',
  imports: [NgClass, IconsModule],
  templateUrl: './card-resource.component.html',
  styles: [
    `
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .bg-muted\\/50 {
        background-color: rgba(248, 250, 252, 0.5);
      }

      .to-muted {
        --tw-gradient-to: #f8fafc;
      }

      .text-muted-foreground {
        color: #64748b;
      }

      .bg-background\\/90 {
        background-color: rgba(255, 255, 255, 0.9);
      }
    `,
  ],
})
export class CardResourceComponent {
  @Input() resource!: Resource;
  @Input() selectedResources: string[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  showFallback = false;

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

  toggleSelection(): void {
    this.selectionChange.emit(this.resource.id);
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

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hace 1 día';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`;
    if (diffDays < 365) return `Hace ${Math.ceil(diffDays / 30)} meses`;
    return `Hace ${Math.ceil(diffDays / 365)} años`;
  }

  getResourceIcon(type: string): { name: string; class: string } {
    const icons: { [key: string]: { name: string; class: string } } = {
      document: {
        name: 'FileText',
        class: 'h-8 w-8 text-blue-500 drop-shadow-sm',
      },
      link: { name: 'Link', class: 'h-8 w-8 text-green-500 drop-shadow-sm' },
      image: { name: 'Image', class: 'h-8 w-8 text-purple-500 drop-shadow-sm' },
      video: { name: 'Video', class: 'h-8 w-8 text-red-500 drop-shadow-sm' },
    };
    return icons[type] || icons['document'];
  }
}
