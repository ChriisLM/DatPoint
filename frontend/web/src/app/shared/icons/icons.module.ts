import { NgModule } from '@angular/core';
import { LucideAngularModule, Home, Clock, Star, FileText, Image as ImageIcon, Video, Link as LinkIcon, Plus, DatabaseZap, FolderOpen, Settings, LoaderCircle, Search } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      Home,
      Clock,
      Star,
      FileText,
      Image: ImageIcon,
      Video,
      Link: LinkIcon,
      Plus,
      DatabaseZap,
      FolderOpen,
      Settings,
      LoaderCircle,
      Search
    })
  ],
  exports: [LucideAngularModule]
})
export class IconsModule {}
