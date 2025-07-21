import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBoxComponent } from "../../components/search-box/search-box.component";

@Component({
  selector: 'dtp-home-page',
  imports: [SearchBoxComponent],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent { 

  private router = inject(Router); 

  goToSearch(query: string) {
    this.router.navigate(['/dashboard/search'], { queryParams: { q: query } });
  }
  
  // searchQuery = '';
  // isSearching = signal(false);
  
  // recentSearches = signal([
  //   'datasets de prueba',
  //   'documentación API',
  //   'imágenes corporativas'
  // ]);

  // onKeyDown(event: KeyboardEvent) {
  //   if (event.key === 'Enter' && !event.shiftKey) {
  //     event.preventDefault();
  //     this.performSearch();
  //   }
  // }

  // selectSuggestion(suggestion: string) {
  //   this.searchQuery = suggestion;
  //   this.performSearch();
  // }

  // async performSearch() {
  //   if (!this.searchQuery.trim() || this.isSearching()) return;
    
  //   this.isSearching.set(true);
    
  //   try {
  //     const recent = this.recentSearches();
  //     if (!recent.includes(this.searchQuery)) {
  //       this.recentSearches.set([this.searchQuery, ...recent.slice(0, 4)]);
  //     }
      
  //     // ----- Falta agregar aqui la coneccion al backend -----
  //     //
  //     //
  //     //
      
  //     this.router.navigate(['/dashboard/search'], { 
  //       queryParams: { q: this.searchQuery } 
  //     });
      
  //   } catch (error) {
  //     console.error('Error in the search:', error);
  //   } finally {
  //     this.isSearching.set(false);
  //   }
  // }
}
