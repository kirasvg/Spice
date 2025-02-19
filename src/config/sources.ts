import { NewsSource } from '@/types/news';

export const newsSources: NewsSource[] = [
  // General News Sources
  {
    name: 'Reuters',
    url: 'https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    },
    category: 'general'
  },
  {
    name: 'BBC News',
    url: 'http://feeds.bbci.co.uk/news/world/rss.xml',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    },
    category: 'general'
  },
  {
    name: 'CNN',
    url: 'http://rss.cnn.com/rss/edition.rss',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    },
    category: 'general'
  },

  // Technology Sources
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    },
    category: 'technology'
  },
  {
    name: 'The Verge',
    url: 'https://www.theverge.com/rss/index.xml',
    selector: {
      article: 'entry',
      title: 'title',
      description: 'content',
      link: 'id',
      date: 'published'
    },
    category: 'technology'
  },

  // Markets Sources
  {
    name: 'Yahoo Finance',
    url: 'https://finance.yahoo.com/news/rssindex',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    },
    category: 'markets'
  },
  {
    name: 'MarketWatch',
    url: 'http://feeds.marketwatch.com/marketwatch/topstories/',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    },
    category: 'markets'
  },

  // Sports Sources
  {
    name: 'ESPN',
    url: 'https://www.espn.com/espn/rss/news',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    },
    category: 'sports'
  },
  {
    name: 'BBC Sport',
    url: 'http://feeds.bbci.co.uk/sport/rss.xml',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    },
    category: 'sports'
  },

  // Entertainment Sources
  {
    name: 'Variety',
    url: 'https://variety.com/feed/',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    },
    category: 'entertainment'
  },
  {
    name: 'Entertainment Weekly',
    url: 'https://ew.com/feed/',
    selector: {
      article: 'item',
      title: 'title',
      description: 'description',
      link: 'link',
      date: 'pubDate'
    },
    category: 'entertainment'
  }
];
