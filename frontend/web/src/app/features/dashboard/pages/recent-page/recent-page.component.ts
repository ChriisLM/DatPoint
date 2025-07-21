import { Component } from '@angular/core';
import { PreviewSectionComponent } from '../../components/preview-section/preview-section.component';
import { CardResourceComponent } from "../../components/card-resource/card-resource.component";
import { BatchActionsComponent } from "../../components/batch-actions/batch-actions.component";
import { Resource } from '../../interfaces/dashboard.interface';
import { CardListResourceComponent } from '../../components/card-list-resource/card-list-resource.component';

@Component({
  selector: 'dtp-recent-page',
  imports: [PreviewSectionComponent, CardResourceComponent, BatchActionsComponent, CardListResourceComponent],
  templateUrl: './recent-page.component.html',
})
export default class RecentPageComponent {
  selectedView: 'grid' | 'list' = 'grid';

  onViewChange(view: 'grid' | 'list') {
    this.selectedView = view;
  }

  recentInfo = {
    title: 'Recent',
    label: '8 recently accessed resources',
    icon: 'Clock',
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

  // onMenuAction(resourceId: string, action: string): void {
  //   console.log(`Acción "${action}" ejecutada en recurso:`, resourceId);
    
  //   switch (action) {
  //     case 'edit':
  //       this.editResource(resourceId);
  //       break;
  //     case 'delete':
  //       this.deleteResource(resourceId);
  //       break;
  //     case 'share':
  //       this.shareResource(resourceId);
  //       break;
  //     case 'download':
  //       this.downloadResource(resourceId);
  //       break;
  //   }
  // }

  // private editResource(resourceId: string): void {
  //   console.log('Editando recurso:', resourceId);
  //   // Implementar lógica de edición
  // }

  // private deleteResource(resourceId: string): void {
  //   console.log('Eliminando recurso:', resourceId);
  //   this.resources = this.resources.filter(r => r.id !== resourceId);
  //   this.selectedResources = this.selectedResources.filter(id => id !== resourceId);
  // }

  // private shareResource(resourceId: string): void {
  //   console.log('Compartiendo recurso:', resourceId);
  //   // Implementar lógica de compartir
  // }

  // private downloadResource(resourceId: string): void {
  //   console.log('Descargando recurso:', resourceId);
  //   // Implementar lógica de descarga
  // }

}
