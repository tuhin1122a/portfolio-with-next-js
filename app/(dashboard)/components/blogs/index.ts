export interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  createdAt: string;
  readTime: string;
  image: string;
  category: string;
  tags: string[];
  published: boolean;
  author?: {
    _id: string;
    name: string;
    image?: string;
  };
}
