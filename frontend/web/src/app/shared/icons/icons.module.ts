import { NgModule } from '@angular/core';
import { LucideAngularModule, Home, Clock, Star, FileText, Image as ImageIcon, Video, Link as LinkIcon, Plus, DatabaseZap, FolderOpen, Settings, LoaderCircle, Search, Grid2X2, List, GalleryVerticalEnd, Menu, ShieldCheck, Zap, RefreshCcw, Check, Calendar, Eye, Pencil, StarOff, Trash, UserCircle, BadgeQuestionMark, LogOut } from 'lucide-angular';

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
      Search,
      Grid2X2,
      List,
      GalleryVerticalEnd,
      Menu,
      ShieldCheck,
      Zap,
      RefreshCcw,
      Check,
      Calendar,
      Eye,
      Pencil,
      StarOff,
      Trash,
      UserCircle,
      BadgeQuestionMark,
      LogOut
    })
  ],
  exports: [LucideAngularModule]
})
export class IconsModule {}
