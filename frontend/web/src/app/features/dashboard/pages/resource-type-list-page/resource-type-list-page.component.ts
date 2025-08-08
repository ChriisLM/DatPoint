import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { IconMap, Resource, ResourceType, TypeMap } from '../../interfaces/dashboard.interface';
import { TitleCasePipe } from '@angular/common';
import { CardResourceComponent } from "../../components/card-resource/card-resource.component";
import { CardListResourceComponent } from '../../components/card-list-resource/card-list-resource.component';
import { ResourceService } from '../../../../shared/services/Resource.service';
import { switchMap } from 'rxjs/operators';

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
  validPriorities = ['low', 'normal', 'high'] as const;

  constructor(private route: ActivatedRoute, private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.type = params.get('type') || 'File';
          const normalizedType = this.normalizeResourceType(this.type);
          return this.resourceService.getResourcesByFormat(normalizedType);
        })
      )
      .subscribe({
        next: (resources) => {
          this.resources = resources.map(r => ({
            ...r,
            resource_type: this.toResourceType(r.resource_type),
            tags: r.tags ?? [],
            priority: this.validPriorities.includes(r.priority as any) ? (r.priority as 'low' | 'normal' | 'high') : 'normal',
            work_space: r.work_space ?? '',
          }));
          this.filteredResources = [...this.resources];
        },
        error: (err) => {
          console.error('Error cargando recursos:', err);
          this.resources = [];
          this.filteredResources = [];
        }
      });
  }

  toResourceType(value: string): ResourceType {
    const validTypes: ResourceType[] = ['Url', 'Image', 'Video', 'File'];
    return validTypes.includes(value as ResourceType) ? (value as ResourceType) : 'File';
  }

  normalizeResourceType(value: string): ResourceType {
    const map: Record<string, ResourceType> = {
      'link': 'Url',
      'links': 'Url',
      'image': 'Image',
      'images': 'Image',
      'video': 'Video',
      'videos': 'Video',
      'file': 'File',
      'files': 'File',
    };

    const normalized = value.toLowerCase();
    return map[normalized] ?? 'File';
  }

  getIconByType(label: string): string {
    return IconMap[label.toLowerCase()] || 'Link';
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
