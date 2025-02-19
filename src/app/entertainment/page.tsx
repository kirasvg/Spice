import { scrapeAllSources } from '@/lib/scraper';
import { newsSources } from '@/config/sources';
import { NewsArticle } from '@/types/news';
import Image from 'next/image';

async function getEntertainmentNews(): Promise<NewsArticle[]> {
  const articles = await scrapeAllSources(
    newsSources.filter(source => source.category === 'entertainment')
  );
  return articles;
}

function formatReadTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} MIN READ`;
}

function formatTimestamp(date: Date): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export default async function EntertainmentPage() {
  const articles = await getEntertainmentNews();
  const mainArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Main Article */}
      <article className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {mainArticle.imageUrl && (
            <div className="relative h-64 md:h-[500px] md:w-2/3">
              <Image
                src={mainArticle.imageUrl}
                alt={mainArticle.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                quality={95}
                priority
              />
            </div>
          )}
          <div className="p-8 md:w-1/3">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
              <span className="text-blue-600">{mainArticle.source}</span>
              <span>•</span>
              <span>{formatReadTime(mainArticle.description)}</span>
              <span>•</span>
              <span>{formatTimestamp(mainArticle.publishedAt)}</span>
            </div>
            <h1 className="text-3xl font-bold mb-4 hover:text-blue-600">
              <a href={mainArticle.articleUrl} target="_blank" rel="noopener noreferrer">
                {mainArticle.title}
              </a>
            </h1>
            <p className="text-gray-600 text-lg">{mainArticle.description}</p>
          </div>
        </div>
      </article>

      {/* Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {otherArticles.map((article, index) => {
          const isLarge = index % 5 === 0;
          return (
            <article 
              key={article.id} 
              className={`bg-white rounded-lg shadow-sm overflow-hidden ${
                isLarge ? 'md:col-span-2 lg:col-span-2' : ''
              } max-w-2xl mx-auto w-full`}
            >
              {article.imageUrl && (
                <div className={`relative ${isLarge ? 'h-72' : 'h-48'}`}>
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes={isLarge ? 
                      "(max-width: 768px) 100vw, 66vw" : 
                      "(max-width: 768px) 100vw, 33vw"}
                    quality={95}
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <span className="text-blue-600">{article.source}</span>
                  <span>•</span>
                  <span>{formatReadTime(article.description)}</span>
                  <span>•</span>
                  <span>{formatTimestamp(article.publishedAt)}</span>
                </div>
                <h2 className={`${
                  isLarge ? 'text-2xl' : 'text-lg'
                } font-bold mb-3 hover:text-blue-600`}>
                  <a href={article.articleUrl} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h2>
                <p className={`text-gray-600 ${
                  isLarge ? 'line-clamp-4' : 'line-clamp-3'
                }`}>{article.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
