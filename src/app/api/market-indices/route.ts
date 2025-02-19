import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const BASE_URL = 'https://api.polygon.io/v2';

// Reduced to 4 major indices to stay within rate limits
const MARKET_INDICES = [
  { symbol: 'SPY', name: 'S&P 500' },    // S&P 500 ETF
  { symbol: 'DIA', name: 'Dow Jones' },  // Dow Jones ETF
  { symbol: 'QQQ', name: 'NASDAQ' },     // NASDAQ ETF
  { symbol: 'IWM', name: 'Russell 2000' } // Russell 2000 ETF
];

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface PolygonResponse {
  status: string;
  results: {
    c: number;  // close price
    h: number;  // high
    l: number;  // low
    o: number;  // open
    v: number;  // volume
    vw: number; // volume weighted average price
  }[];
}

// Cache the results for 2 minutes to respect rate limits
let cachedData: MarketData[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 120 * 1000; // 2 minutes in milliseconds

async function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<PolygonResponse> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 429 && retries > 0) {
      // Rate limit hit - wait with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1, delay * 2);
    }
    throw error;
  }
}

async function fetchTickerData(symbol: string): Promise<MarketData | null> {
  try {
    const url = `${BASE_URL}/aggs/ticker/${symbol}/prev?apiKey=${POLYGON_API_KEY}`;
    const data = await fetchWithRetry(url);
    
    if (!data.results || data.results.length === 0) {
      console.error(`No data available for ${symbol}`);
      return null;
    }

    const result = data.results[0];
    const price = result.c;
    const prevClose = result.o;
    const change = price - prevClose;
    const changePercent = (change / prevClose) * 100;

    return {
      symbol,
      name: MARKET_INDICES.find(index => index.symbol === symbol)?.name || symbol,
      price,
      change,
      changePercent
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
}

export async function GET() {
  try {
    const currentTime = Date.now();

    // Return cached data if it's still valid
    if (cachedData && currentTime - lastFetchTime < CACHE_DURATION) {
      return NextResponse.json(cachedData);
    }

    // Fetch fresh data for all indices
    const promises = MARKET_INDICES.map(index => fetchTickerData(index.symbol));
    const results = await Promise.all(promises);
    
    // Filter out null results and update cache
    cachedData = results.filter((data): data is MarketData => data !== null);
    lastFetchTime = currentTime;

    return NextResponse.json(cachedData);
  } catch (error) {
    console.error('Error fetching market indices:', error);
    
    // If we have cached data, return it even if expired
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Return mock data as fallback
    const mockData: MarketData[] = MARKET_INDICES.map(index => ({
      symbol: index.symbol,
      name: index.name,
      price: 0,
      change: 0,
      changePercent: 0
    }));

    return NextResponse.json(mockData);
  }
}
