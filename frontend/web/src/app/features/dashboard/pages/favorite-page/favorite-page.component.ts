import { Component } from '@angular/core';
import { PreviewSectionComponent } from "../../components/preview-section/preview-section.component";
import { CardResourceComponent } from '../../components/card-resource/card-resource.component';
import { BatchActionsComponent } from '../../components/batch-actions/batch-actions.component';
import { Resource } from '../../interfaces/dashboard.interface';
import { CardListResourceComponent } from '../../components/card-list-resource/card-list-resource.component';

@Component({
  selector: 'dtp-favorite-page',
  imports: [PreviewSectionComponent, CardResourceComponent, BatchActionsComponent, CardListResourceComponent],
  templateUrl: './favorite-page.component.html',
})
export default class FavoritePageComponent { 
  selectedView: 'grid' | 'list' = 'grid';

  onViewChange(view: 'grid' | 'list') {
    this.selectedView = view;
  }

  favoriteInfo = {
    title: 'Favorite',
    label: '8 recently accessed resources',
    icon: 'Star',
  };


  selectedResources: string[] = [];
    
  resources: Resource[] = [
    {
      id: '1',
      title: 'Guía de Angular 19',
      description: 'Una guía completa sobre las nuevas características de Angular 19 y cómo implementarlas en proyectos reales.',
      thumbnail: 'https://example.com/angular-guide.jpg',
      created_by: 'Juan Pérez',
      workspace: 'work',
      tags: ['angular', 'typescript', 'desarrollo', 'frontend'],
      size: 'N/A',
      created_at: '2024-12-15T10:30:00Z',
      type: 'document',
      favorite: true
    },
    {
      id: '2',
      title: 'Componentes Reutilizables con Tailwind',
      description: 'Aprende a crear componentes reutilizables utilizando Tailwind CSS y las mejores prácticas de diseño.',
      thumbnail: 'https://example.com/tailwind-components.jpg',
      created_by: 'María García',
      workspace: 'personal',
      tags: ['tailwind', 'css', 'components'],
      size: '1.8 MB',
      created_at: '2024-12-10T14:20:00Z',
      type: 'video',
      favorite: false
    },
    {
      id: '3',
      title: 'Arquitectura de Microservicios',
      description: 'Diseño y implementación de una arquitectura de microservicios escalable usando Docker y Kubernetes.',
      thumbnail: 'https://example.com/microservices.jpg',
      created_by: 'Carlos Rodríguez',
      workspace: 'project',
      tags: ['microservicios', 'docker', 'kubernetes', 'backend', 'arquitectura'],
      size: '5.2 MB',
      created_at: '2024-12-05T09:15:00Z',
      type: 'link',
      favorite: true
    }
  ];

  onSelectionChange(resourceId: string): void {
    const index = this.selectedResources.indexOf(resourceId);
    if (index > -1) {
      this.selectedResources.splice(index, 1);
    } else {
      this.selectedResources.push(resourceId);
    }
    
    console.log('Recursos seleccionados:', this.selectedResources);
  }
}
