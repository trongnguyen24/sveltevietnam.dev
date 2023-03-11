export type ColorScheme = 'light' | 'dark' | 'system';

export interface Event {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  href: string;
  highlights: EventHighlight[];
  sponsors: Sponsor[];
}

export interface EventHighlight {
  image?: string;
  title: string;
  description: string;
}

export interface Sponsor {
  /** inline svg with height of 40 */
  image: string;
  name: string;
  href: string;
}

export interface Job {
  title: string;
  company: string;
  salary?: string;
  location?: string;
  locationPolicy?: 'remote' | 'hybrid';
  createdAt: string;
  expiresAt?: string;
  sponsored: boolean;
}
