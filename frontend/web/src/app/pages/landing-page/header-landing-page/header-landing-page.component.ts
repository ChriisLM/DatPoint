import { Component } from '@angular/core';
import { IconsModule } from '../../../shared/icons/icons.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dtp-header-landing-page',
  imports: [IconsModule, RouterLink],
  templateUrl: './header-landing-page.component.html',
})
export class HeaderLandingPageComponent { 
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
