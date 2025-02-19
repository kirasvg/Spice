import axios from 'axios';
import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';
import { NewsSource, NewsArticle } from '@/types/news';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractImage($: CheerioAPI, element: cheerio.Cheerio<any>): string | undefined {
  // Try to find image in media:content
  const mediaContent = $(element).find('media\\:content, content').first();
  if (mediaContent.length > 0) {
    return mediaContent.attr('url');
  }

  // Try to find image in enclosure
  const enclosure = $(element).find('enclosure[type^="image"]').first();
  if (enclosure.length > 0) {
    return enclosure.attr('url');
  }

  // Try to find image in description
  const description = $(element).find('description').html();
  if (description) {
    const $desc = cheerio.load(description);
    const img = $desc('img').first();
    if (img.length > 0) {
      return img.attr('src');
    }
  }

  return undefined;
}

async function scrapeNews(source: NewsSource): Promise<NewsArticle[]> {
  try {
    console.log(`Fetching news from ${source.name}...`);
    
    const response = await axios.get(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data, {
      xmlMode: true
    });

    const articles: NewsArticle[] = [];
    
    $(source.selector.article).each((_, element) => {
      try {
        const title = $(element).find(source.selector.title).text().trim();
        const description = $(element).find(source.selector.description).text().trim();
        const articleUrl = $(element).find(source.selector.link).text().trim();
        const pubDate = $(element).find(source.selector.date).text().trim();
        const imageUrl = source.selector.image 
          ? $(element).find(source.selector.image).attr('url') 
          : extractImage($, $(element));

        if (title && description && articleUrl) {
          articles.push({
            id: uuidv4(),
            title,
            description,
            articleUrl,
            publishedAt: new Date(pubDate),
            source: source.name,
            imageUrl,
          });
        }
      } catch (error) {
        console.error(`Error parsing article from ${source.name}:`, error);
      }
    });

    return articles;
  } catch (error) {
    console.error(`Error scraping ${source.name}:`, error);
    return [];
  }
}

export async function scrapeAllSources(sources: NewsSource[]): Promise<NewsArticle[]> {
  try {
    const results = await Promise.allSettled(
      sources.map(source => scrapeNews(source))
    );

    const articles = results
      .filter((result): result is PromiseFulfilledResult<NewsArticle[]> => 
        result.status === 'fulfilled'
      )
      .flatMap(result => result.value);

    return articles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  } catch (error) {
    console.error('Error scraping all sources:', error);
    return [];
  }
}

export { scrapeNews };
