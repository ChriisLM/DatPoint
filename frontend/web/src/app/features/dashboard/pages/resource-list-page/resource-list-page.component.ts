import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dtp-resource-list-page',
  imports: [],
  templateUrl: './resource-list-page.component.html',
})
export default class ResourceListComponent { 
  type: string = '';
  resources: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type') || 'files';
      this.loadResources();
    });
  }

  loadResources(): void {
    switch (this.type) {
      case 'files':
        this.resources = [/* objetos de archivos */];
        break;
      case 'links':
        this.resources = [/* objetos de links */];
        break;
      case 'pictures':
        this.resources = [/* objetos de imágenes */];
        break;
      case 'videos':
        this.resources = [/* objetos de videos */];
        break;
      default:
        this.resources = [];
    }
  }
}
