import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../../shared/icons/icons.module';

@Component({
  selector: 'dtp-batch-actions',
  imports: [IconsModule],
  templateUrl: './batch-actions.component.html',
})
export class BatchActionsComponent { 
  @Input() selectedResources: any[] = [];

  moveTo() {
    console.log('Mover:', this.selectedResources);
  }

  share() {
    console.log('Compartir:', this.selectedResources);
  }

  deleteIt() {
    console.log('Eliminar:', this.selectedResources);
  }
}
