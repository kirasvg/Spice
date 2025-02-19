import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spice 🌶️ | Hot News Daily',
  description: 'Your daily dose of the hottest news, served fresh! 🔥',
  icons: {
    icon: '/images/newslogo.png',
    apple: '/images/newslogo.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--gradient-1)_0%,transparent_100%)] opacity-10 blur-3xl"></div>
        <Header />
        <main className="container mx-auto px-4 pt-32 pb-8">
          {children}
        </main>
        <footer className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 py-12 mt-12">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold gradient-text">About Spice 🌶️</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your go-to source for the freshest news! We keep it real, fun, and spicy! 🔥
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="social-icon group">
                    <span className="emoji-float">🐦</span>
                  </a>
                  <a href="#" className="social-icon group">
                    <span className="emoji-float">👥</span>
                  </a>
                  <a href="#" className="social-icon group">
                    <span className="emoji-float">📸</span>
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold gradient-text">Quick Links 🚀</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/markets" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      <span className="emoji-float">📈</span>
                      <span>Markets</span>
                    </a>
                  </li>
                  <li>
                    <a href="/technology" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      <span className="emoji-float">💻</span>
                      <span>Technology</span>
                    </a>
                  </li>
                  <li>
                    <a href="/sports" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      <span className="emoji-float">⚽</span>
                      <span>Sports</span>
                    </a>
                  </li>
                  <li>
                    <a href="/entertainment" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      <span className="emoji-float">🎬</span>
                      <span>Entertainment</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold gradient-text">Stay Updated! 📱</h3>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 hover-card">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Join our newsletter for the hottest news delivered to your inbox! 🎯
                  </p>
                  <div className="flex">
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="flex-1 px-4 py-2 rounded-l-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="btn-primary rounded-r-full rounded-l-none">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Made with <span className="emoji-float inline-block">❤️</span> by the Spice team
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-600 mt-2">
                  &copy; {new Date().getFullYear()} Spice News. Stay Spicy! 🌶️
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
