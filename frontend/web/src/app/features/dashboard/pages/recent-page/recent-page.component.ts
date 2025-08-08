import { Component } from '@angular/core';
import { PreviewSectionComponent } from '../../components/preview-section/preview-section.component';
import { CardResourceComponent } from "../../components/card-resource/card-resource.component";
import { BatchActionsComponent } from "../../components/batch-actions/batch-actions.component";
import { Resource, ResourceType } from '../../interfaces/dashboard.interface';
import { CardListResourceComponent } from '../../components/card-list-resource/card-list-resource.component';
import { ResourceService } from '../../../../shared/services/Resource.service';
import { AuthService } from '../../../../shared/services/auth.service';

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

  validPriorities = ['low', 'normal', 'high'] as const;

  selectedResources: string[] = [];
  
  resources: Resource[] = [];

  constructor(private resourceService: ResourceService, private authService: AuthService) {}

  ngOnInit(): void {
    console.log('Token:', this.authService.getToken());
    this.loadMyResources();
  }

  loadMyResources(): void {
    this.resourceService.getMyResources().subscribe({
      next: (resources) => {
        this.resources = resources.map(r => ({
          ...r,
          resource_type: this.toResourceType(r.resource_type),
          tags: r.tags ?? [],
          priority: this.validPriorities.includes(r.priority as any) ? (r.priority as 'low' | 'normal' | 'high') : 'normal',
          work_space: r.work_space ?? '',
        }));
      },
      error: (err) => {
        console.error('Error al cargar recursos del usuario:', err);
        this.resources = [];
      },
    });
  }

  toResourceType(value: string): ResourceType {
    const validTypes: ResourceType[] = ['Url', 'Image', 'Video', 'File'];
    return validTypes.includes(value as ResourceType) ? (value as ResourceType) : 'File';
  }

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
