'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  articleUrl: string;
  category: string;
  source: string;
  publishedAt: Date;
}

const categoryEmojis: { [key: string]: string } = {
  markets: '📈',
  technology: '💻',
  sports: '⚽',
  entertainment: '🎬',
  business: '💼',
  default: '📰'
};

export default function NewsCard({
  title,
  description,
  imageUrl,
  articleUrl,
  category,
  source,
  publishedAt
}: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const emoji = categoryEmojis[category.toLowerCase()] || categoryEmojis.default;
  const timeAgo = new Date(publishedAt).toLocaleDateString();

  return (
    <Link 
      href={articleUrl}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="news-card group relative">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-4xl">{emoji}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category Tag */}
          <div className="flex items-center justify-between mb-4">
            <span className="category-tag text-sm">
              {emoji} {category}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{timeAgo}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {description}
          </p>

          {/* Source and Read More */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              From {source}
            </span>
            <span className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-300">
              Read More
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Hover Effects */}
        <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
      </article>
    </Link>
  );
}
