export interface Resource {
  id: string;
  title: string;
  description?: string;
  resource_type: ResourceType;
  format?: string;
  file_path?: string;
  link_url?: string;
  metadata?: { [key: string]: any };
  tags: string[];
  created_by: string;
  created_at: string;
  updated_at?: string;
  is_public?: boolean;
  priority?: 'low' | 'normal' | 'high';
  work_space: string;
  favorite: boolean;
}

export type ResourceType = 'Url' | 'Image' | 'Video' | 'File';

export const TypeMap: Record<string, ResourceType> = {
  links: "Url",
  images: "Image",
  videos: "Video",
  files: "File"
};

export type PRIORITY = 'low' | 'normal' | 'high';

export interface CreateResource {
  title: string;
  description?: string;
  resource_type: ResourceType;
  format?: string;
  file_path?: string;
  link_url?: string;
  metadata?: { [key: string]: any };
  tags: string[];
  created_by: string;
  is_public?: boolean;
  priority?: 'low' | 'normal' | 'high';
  work_space?: string;
  favorite?: boolean;
}

export const IconMap: Record<string, string> = {
  links: 'Link',
  files: 'FileText',
  images: 'Image',
  videos: 'Video',
};