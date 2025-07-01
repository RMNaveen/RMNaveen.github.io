export interface SocialLink {
  id: string;
  title: string;
  icon: string;
  url: string;
}

export interface StoryHighlight {
  id: string;
  title: string;
  icon: string;
  items: string[];
  seen?: boolean;
}

export interface StoryItem {
  id: string;
  content: string;
  duration?: number;
}

export interface Story {
  id: string;
  title: string;
  icon: string;
  items: StoryItem[];
  seen: boolean;
}

export interface PortfolioPost {
  id: string;
  title: string;
  image?: string;
  video?: string;
  description: string;
  caption: string;
  tags: string[];
  githubLink?: string;
  type: 'project' | 'experience' | 'education' | 'skill' | 'research';
  likes?: number;
  mediaType?: 'image' | 'video';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  relation: 'professor' | 'colleague' | 'client';
}
