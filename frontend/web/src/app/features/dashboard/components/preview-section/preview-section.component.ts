import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { NgClass } from '@angular/common';

interface SectionInfo {
  title: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'dtp-preview-section',
  imports: [IconsModule, NgClass],
  templateUrl: './preview-section.component.html',
})
export class PreviewSectionComponent { 
  activeView: 'grid' | 'list' = 'grid';

  @Output() viewChange = new EventEmitter<'grid' | 'list'>();

  setView(view: 'grid' | 'list') {
    if (this.activeView !== view) {
      this.activeView = view;
      this.viewChange.emit(this.activeView);
    }
  }
  
  @Input() sectionInfo: SectionInfo = {
    title: "Recent",
    label: '8 recently accessed resources',
    icon: "Clock"
  };

  cardsInfo = [
    { color: "blue", icon: "FileText", label: "Files", count: 2, type: "recent" },
    { color: "purple", icon: "Image", label: "Pictures", count: 2, type: "favorite" },
    { color: "green", icon: "Link", label: "Links", count: 2, type: "search" },
    { color: "red", icon: "Video", label: "Videos", count: 2, type: "recent" }
  ];

  getPreviewBgClasses(title: string): string {
    switch (title) {
      case 'Recent': return 'bg-blue-400/50';
      case 'Favorite': return 'bg-yellow-400/50';
      case 'Resources': return 'bg-green-400/50';
      default: return 'bg-gray-900/20';
    }
  }
  getPreviewColorClasses(title: string): string {
    switch (title) {
      case 'Recent': return 'text-blue-400';
      case 'Favorite': return 'text-yellow-400';
      case 'Resources': return 'text-green-400';
      default: return 'text-gray-900/20';
    }
  }

  getCardClasses(color: string): string {
    const baseClasses = 'border-l-4';
    switch (color) {
      case 'blue': return `${baseClasses} border-blue-500`;
      case 'purple': return `${baseClasses} border-purple-500`;
      case 'green': return `${baseClasses} border-green-500`;
      case 'red': return `${baseClasses} border-red-500`;
      default: return `${baseClasses} border-gray-500`;
    }
  }

  getIconBgClasses(color: string): string {
    switch (color) {
      case 'blue': return 'bg-blue-900/20';
      case 'purple': return 'bg-purple-900/20';
      case 'green': return 'bg-green-900/20';
      case 'red': return 'bg-red-900/20';
      default: return 'bg-gray-900/20';
    }
  }

  getIconClasses(color: string): string {
    switch (color) {
      case 'blue': return 'text-blue-400';
      case 'purple': return 'text-purple-400';
      case 'green': return 'text-green-400';
      case 'red': return 'text-red-400';
      default: return 'text-gray-400';
    }
  }

  getCountClasses(color: string): string {
    switch (color) {
      case 'blue': return 'text-blue-400';
      case 'purple': return 'text-purple-400';
      case 'green': return 'text-green-400';
      case 'red': return 'text-red-400';
      default: return 'text-gray-400';
    }
  }

  getFileTypes(color: string): string {
    switch (color) {
      case 'blue': return 'PDF <br /> DOC <br /> TXT';
      case 'purple': return 'JPG <br /> PNG <br /> SVG';
      case 'green': return 'Web <br /> Artículos';
      case 'red': return 'MP4 <br /> AVI <br /> MOV';
      default: return 'Archivos';
    }
  }
}
