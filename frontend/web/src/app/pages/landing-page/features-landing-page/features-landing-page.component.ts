import { Component } from '@angular/core';
import { IconsModule } from '../../../shared/icons/icons.module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'dtp-features-landing-page',
  imports: [IconsModule, NgClass],
  templateUrl: './features-landing-page.component.html',
})
export class FeaturesLandingPageComponent {
  features = [
    {
      icon: 'search',
      title: 'Semantic Search',
      description:
        'Find exactly what you are looking for using artificial intelligence. No need to remember exact names.',
      color: 'blue',
    },
    {
      icon: 'workspace',
      title: 'Workspaces',
      description:
        'Organize your resources in customized spaces. Each project has its own place.',
      color: 'purple',
    },
    {
      icon: 'files',
      title: 'All your Files',
      description:
        'Documents, images, videos, links. Everything centralized and accessible from anywhere.',
      color: 'green',
    },
    {
      icon: 'security',
      title: 'Total Security',
      description:
        'Your data is protected with enterprise-grade encryption and automatic backups.',
      color: 'red',
    },
    {
      icon: 'speed',
      title: 'Instant Access',
      description:
        'Find and access your resources in seconds, not minutes. Optimized for speed.',
      color: 'yellow',
    },
    {
      icon: 'sync',
      title: 'Synchronization',
      description:
        'Access from any device. Your changes are automatically synchronized.',
      color: 'indigo',
    },
  ];

  getColorClasses(color: string): string {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      green: 'bg-green-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
      indigo: 'bg-indigo-500',
    };
    return colorMap[color] || 'bg-gray-500';
  }
}
