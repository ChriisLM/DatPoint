import { Component } from '@angular/core';
import { IconsModule } from '../../../shared/icons/icons.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dpt-hero-landing-page',
  imports: [IconsModule, RouterLink],
  templateUrl: './hero-landing-page.component.html',
})
export class HeroLandingPageComponent { 
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
