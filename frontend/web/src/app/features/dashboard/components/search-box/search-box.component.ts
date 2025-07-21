import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { SearchService } from '../../services/SearchService.service';
import { IconsModule } from '../../../../shared/icons/icons.module';

@Component({
  selector: 'dtp-search-box',
  imports: [IconsModule],
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent { 
  private service = inject(SearchService);
  @Output() search = new EventEmitter<string>();

  searchQuery = signal('');

  recentSearches = this.service.recentSearches;
  isSearching = this.service.isSearching;

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.triggerSearch();
    }
  }

  triggerSearch() {
    this.service.performSearch(this.searchQuery());
  }

  selectSuggestion(q: string) {
    this.searchQuery.set(q);
    this.triggerSearch();
  }
}
