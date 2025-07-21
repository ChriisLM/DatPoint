import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private router:Router){}
  recentSearches = signal<string[]>([
  // 'datasets de prueba',
  //   'documentación API',
  //   'imágenes corporativas'
  ]);
  isSearching = signal(false);

  setRecent(query: string) {
    const recent = this.recentSearches();
    if (!recent.includes(query)) {
      this.recentSearches.set([query, ...recent.slice(0, 4)]);
    }
  }

  performSearch(query: string) {
    if (!query.trim() || this.isSearching()) return;

    this.isSearching.set(true);
    try {
      this.router.navigate(['dashboard/search'], { queryParams: { q: query.trim() } });
      // ----- Falta agregar aqui la coneccion al backend -----
      //
      //
      //
      this.isSearching.set(false);
    } catch (error) {
      console.error('Error in the search:', error);
    } finally {
      this.isSearching.set(false);
    }
  }
}
