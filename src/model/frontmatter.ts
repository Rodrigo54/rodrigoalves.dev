import { ReadTimeResults } from 'reading-time';

export interface FrontMatter {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  description: string;
  featuredImage: string;
  comments: boolean;
  tags: string[];
  createAt: string;
  updateAt: string;
  body?: string;
  timeToRead: ReadTimeResults;
  fullPath: string;
  music: {
    title: string;
    url: string;
  };
}
