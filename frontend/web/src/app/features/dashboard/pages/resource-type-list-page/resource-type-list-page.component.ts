import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { Resource } from '../../interfaces/dashboard.interface';
import { TitleCasePipe } from '@angular/common';
import { CardResourceComponent } from "../../components/card-resource/card-resource.component";
import { CardListResourceComponent } from '../../components/card-list-resource/card-list-resource.component';

@Component({
  selector: 'dtp-resource-list-page',
  imports: [IconsModule, TitleCasePipe, CardResourceComponent, CardListResourceComponent],
  templateUrl: './resource-type-list-page.component.html',
})
export default class ResourceListComponent {
  type: string = '';
  resources: Resource[] = [];
  filteredResources: Resource[] = [];
  searchTerm: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type') || 'files';
      this.loadResources();
    });
  }

  loadResources(): void {
    // Simulación de datos de prueba
    const allResources: Resource[] = [
      {
        id: '1',
        title: 'Guía de Estudio',
        description: 'PDF con temas clave.',
        type: 'files',
        size: '1.2 MB',
        created_by: 'usuario1',
        created_at: '2025-07-10',
        tags: [],
        favorite: false,
        workspace: 'general',
        thumbnail: '',
      },
      {
        id: '2',
        title: 'Clase React',
        description: 'Grabación de clase',
        type: 'videos',
        file_path: 'assets/videos/clase.mp4',
        size: '20 MB',
        created_by: 'usuario2',
        created_at: '2025-07-08',
        tags: [],
        favorite: false,
        workspace: 'general',
        thumbnail: 'assets/thumbnails/video1.jpg',
      },
      {
        id: '3',
        title: 'Artículo recomendado',
        description: 'Sobre Angular Signals',
        type: 'links',
        link_url: 'https://angular.io',
        size: 'N/A',
        created_by: 'usuario3',
        created_at: '2025-07-05',
        tags: [],
        favorite: false,
        workspace: 'general',
        thumbnail: '',
      },
      {
        id: '1',
        created_by: 'Juan Pérez',
        created_at: '2025-07-01T10:00:00Z',
        title: 'Informe mensual',
        description: 'Documento con análisis financiero',
        type: 'files',
        file_path: '/assets/docs/informe.pdf',
        format: 'pdf',
        tags: ['finanzas', 'julio'],
        size: '1.2 MB',
        favorite: true,
        thumbnail: '',
        workspace: 'Contabilidad',
      },
      {
        id: '2',
        created_by: 'Ana Gómez',
        created_at: '2025-07-02T15:20:00Z',
        title: 'Video tutorial Angular',
        description: 'Paso a paso para crear un componente',
        type: 'videos',
        file_path: '/assets/videos/angular-tutorial.mp4',
        format: 'mp4',
        tags: ['angular', 'tutorial'],
        size: '25 MB',
        favorite: false,
        thumbnail: '/assets/thumbnails/angular.jpg',
        workspace: 'Frontend',
      },
      {
        id: '4',
        created_by: 'Sofía Mejía',
        created_at: '2025-07-03T11:30:00Z',
        title: 'Diseño de dashboard',
        description: 'Captura del nuevo diseño para el panel de control',
        type: 'pictures',
        file_path: '/assets/images/dashboard-design.png',
        format: 'png',
        tags: ['ui', 'dashboard'],
        size: '850 KB',
        favorite: true,
        thumbnail: '/assets/images/dashboard-design.png',
        workspace: 'Diseño',
      },
      {
        id: '5',
        created_by: 'Luis Moreno',
        created_at: '2025-07-06T08:10:00Z',
        title: 'Memoria académica 2024',
        description: 'Compilado de actividades del año',
        type: 'files',
        file_path: '/assets/docs/memoria-2024.docx',
        format: 'docx',
        tags: ['documento', 'memoria'],
        size: '2.4 MB',
        favorite: false,
        thumbnail: '',
        workspace: 'Académico',
      },
      {
        id: '6',
        created_by: 'Valeria Torres',
        created_at: '2025-07-08T12:00:00Z',
        title: 'Repositorio GitHub',
        type: 'links',
        link_url: 'https://github.com/valeriatorres/proyecto-angular',
        tags: ['repositorio', 'código'],
        size: 'N/A',
        favorite: true,
        thumbnail: '',
        workspace: 'Frontend',
      },
      {
        id: '7',
        created_by: 'Andrés Salazar',
        created_at: '2025-07-09T13:00:00Z',
        title: 'Gráfica de temperaturas',
        description: 'Visualización de datos experimentales',
        type: 'pictures',
        file_path: '/assets/images/temp-chart.jpg',
        format: 'jpg',
        tags: ['gráfico', 'experimento'],
        size: '600 KB',
        favorite: false,
        thumbnail: '/assets/images/temp-chart.jpg',
        workspace: 'Investigación',
      },
      {
        id: '8',
        created_by: 'Lucía Romero',
        created_at: '2025-07-10T16:00:00Z',
        title: 'Video resumen del proyecto',
        description: 'Resumen ejecutivo para stakeholders',
        type: 'videos',
        file_path: '/assets/videos/proyecto-resumen.mp4',
        format: 'mp4',
        tags: ['resumen', 'video'],
        size: '18 MB',
        favorite: false,
        thumbnail: '/assets/thumbnails/proyecto.jpg',
        workspace: 'Gerencia',
      },
    ];

    this.resources = allResources.filter((r) => r.type === this.type);
    this.filteredResources = [...this.resources];
  }

  iconMap: Record<string, string> = {
    links: 'Link',
    files: 'FileText',
    pictures: 'Image',
    videos: 'Video',
  };

  getIconByType(label: string): string {
    return this.iconMap[label.toLowerCase()] || 'Link';
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;

    const term = target.value.toLowerCase();
    this.filteredResources = this.resources.filter(
      (res) =>
        res.title.toLowerCase().includes(term) ||
        (res.description && res.description.toLowerCase().includes(term))
    );
  }
}
