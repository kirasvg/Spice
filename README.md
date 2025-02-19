# News Aggregator

A modern news aggregator built with Next.js that scrapes news from various sources and presents them in a newspaper-style format.

## Features

- Scrapes news from multiple sources (Reuters, BBC News, The Guardian)
- Clean and responsive newspaper-style layout
- Server-side rendering for improved SEO
- Error handling and loading states
- Rate limiting for respectful scraping

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Cheerio (for web scraping)
- Axios

## Getting Started

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd newspaper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

You can configure news sources in `src/config/sources.ts`. Each source requires:
- Name
- URL
- CSS selectors for scraping

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Disclaimer

This project is for educational purposes only. Please respect the terms of service and robots.txt files of the news websites you scrape.
