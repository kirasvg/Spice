export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  publishedAt: Date;
  articleUrl: string;
  source: string;
  imageUrl?: string;
}

export interface NewsSource {
  name: string;
  url: string;
  selector: {
    article: string;
    title: string;
    description: string;
    link: string;
    date: string;
    image?: string;
    mediaContent?: string;
  };
}
