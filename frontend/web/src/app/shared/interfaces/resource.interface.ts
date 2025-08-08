export interface Resource {
  id: string;
  title: string;
  description?: string;
  resource_type: string;
  format: string;
  file_path?: string;
  link_url?: string;
  metadata?: Record<string, any>;
  tags?: string[];
  is_public: boolean;
  priority?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  work_space?: string;
  favorite: boolean;
}

export interface CreateResourceRequest {
  title: string;
  description?: string;
  resource_type: string;
  format: string;
  file_path?: string;
  link_url?: string;
  metadata?: Record<string, any>;
  tags?: string[];
  is_public?: boolean;
  priority?: string;
  created_by: string;
  work_space?: string;
  favorite: boolean;
}

export interface UpdateResourceRequest {
  title?: string;
  description?: string;
  format?: string;
  file_path?: string;
  link_url?: string;
  metadata?: Record<string, any>;
  tags?: string[];
  is_public?: boolean;
  priority?: string;
  work_space?: string;
  favorite?: boolean;
}