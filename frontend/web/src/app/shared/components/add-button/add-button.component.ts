import { Component, Input } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';

@Component({
  selector: 'dtp-add-button',
  imports: [IconsModule],
  templateUrl: './add-button.component.html',
})
export class AddButtonComponent { 
  @Input() label = 'Add';
  @Input() icon = 'Plus';
}
