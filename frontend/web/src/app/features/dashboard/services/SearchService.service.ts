import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
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
