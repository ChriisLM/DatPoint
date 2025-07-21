import { Component, Input } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { DialogStateService } from '../../../features/dashboard/services/DialogStateService.service';


@Component({
  selector: 'dtp-add-button',
  imports: [IconsModule],
  templateUrl: './add-button.component.html',
})
export class AddButtonComponent { 
  @Input() label = 'Add';
  @Input() icon = 'Plus';

  constructor(private modalService: DialogStateService) {}
  openDialog() {
    this.modalService.setModalOpen(true);
  }
}
