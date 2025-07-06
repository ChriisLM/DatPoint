import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { IconsModule } from '../../shared/icons/icons.module';
import { CommonModule } from '@angular/common';
import { HeaderLandingPageComponent } from './header-landing-page/header-landing-page.component';
import { HeroLandingPageComponent } from './hero-landing-page/hero-landing-page.component';
import { FeaturesLandingPageComponent } from './features-landing-page/features-landing-page.component';

@Component({
  selector: 'dtp-landing-page',
  imports: [
    FooterComponent,
    IconsModule,
    CommonModule,
    HeaderLandingPageComponent,
    HeroLandingPageComponent,
    FeaturesLandingPageComponent,
  ],
  templateUrl: './landing-page.component.html',
})
export default class LandingPageComponent {
  stats = [
    { number: '1 App', label: 'Everything in one place' },
    { number: '1K+', label: 'Organized resources' },
    { number: '99.9%', label: 'System availability' },
    { number: '24/7', label: 'Planned support' },
  ];

  testimonials = [
    {
      name: 'Maria Gonzalez',
      role: 'UX Designer',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b332c1ef?w=150&h=150&fit=crop&crop=face',
      content:
        'Datpoint completely changed how I organize my projects. The semantic search is amazing.',
      rating: 5,
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Developer',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content:
        "Finally a tool that understands what I'm looking for. My files have never been so organized.",
      rating: 5,
    },
    {
      name: 'Ana Martínez',
      role: 'Content Manager',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content:
        'Team collaboration is perfect. We all access the same resources without confusion.',
      rating: 5,
    },
  ];

  faqs = [
    {
      question: 'What is semantic search?',
      answer:
        "Semantic search uses AI to understand the context and meaning of your search, not just exact keywords. You can search for 'blue project presentation' and find related files even if they don't have those exact words.",
      open: false,
    },
    {
      question: 'Are my files secure?',
      answer:
        'Absolutely. We use AES-256 encryption, automatic daily backups and comply with international security standards such as SOC 2 and GDPR.',
      open: false,
    },
    {
      question: 'Can I collaborate with my team?',
      answer:
        'Yes, you can create shared workspaces, assign specific permissions and collaborate in real time with your team. ',
      open: false,
    },
    {
      question: 'What types of files can I upload?',
      answer:
        'We support virtually all formats: documents (PDF, Word, Excel), images (JPG, PNG, SVG), videos (MP4, AVI), code, web links and more.',
      open: false,
    },
    // {
    //   question: 'Is there a storage limit?',
    //   answer:
    //     'We offer different plans depending on your needs. The free plan includes 5GB, and premium plans offer up to unlimited storage.',
    //   open: false,
    // },
  ];

  currentTestimonial = 0;
  testimonialInterval: any;

  ngOnInit() {
    this.testimonialInterval = setInterval(() => {
      this.currentTestimonial =
        (this.currentTestimonial + 1) % this.testimonials.length;
    }, 5000);
  }

  ngOnDestroy() {
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
