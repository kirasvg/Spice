import { NewsSource } from '@/types/news';

export const newsSources: NewsSource[] = [
  // General News Sources
  {
    name: 'Reuters',
    url: 'https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best',
    category: 'general',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    }
  },
  {
    name: 'BBC News',
    url: 'http://feeds.bbci.co.uk/news/world/rss.xml',
    category: 'general',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    }
  },
  
  // Business News Sources
  {
    name: 'Financial Times',
    url: 'https://www.ft.com/rss/home',
    category: 'business',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    }
  },
  {
    name: 'Bloomberg',
    url: 'https://www.bloomberg.com/feed',
    category: 'business',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    }
  },

  // Technology News Sources
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    category: 'technology',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    }
  },
  {
    name: 'The Verge',
    url: 'https://www.theverge.com/rss/index.xml',
    category: 'technology',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    }
  },

  // Sports News Sources
  {
    name: 'ESPN',
    url: 'https://www.espn.com/espn/rss/news',
    category: 'sports',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    }
  },
  {
    name: 'BBC Sport',
    url: 'https://feeds.bbci.co.uk/sport/rss.xml',
    category: 'sports',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    }
  },

  // Entertainment News Sources
  {
    name: 'Variety',
    url: 'https://variety.com/feed/',
    category: 'entertainment',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    }
  },
  {
    name: 'Hollywood Reporter',
    url: 'https://www.hollywoodreporter.com/feed',
    category: 'entertainment',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    }
  }
];
