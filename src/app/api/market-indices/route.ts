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

// Cache the results for 2 minutes to respect rate limits
let cachedData: any = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 120 * 1000; // 2 minutes in milliseconds

async function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<any> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 429 && retries > 0) {
      // Rate limit hit - wait with exponential backoff
      const waitTime = delay * Math.pow(2, 3 - retries);
      console.log(`Rate limit hit, waiting ${waitTime}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return fetchWithRetry(url, retries - 1, delay);
    }
    throw error;
  }
}

async function fetchTickerData(symbol: string) {
  try {
    // Get the current day's data
    const url = `${BASE_URL}/aggs/ticker/${symbol}/prev?apiKey=${POLYGON_API_KEY}`;
    const data = await fetchWithRetry(url);
    const result = data.results?.[0];

    if (!result) {
      throw new Error('No data available');
    }

    const currentPrice = result.c; // Closing price
    const openPrice = result.o;    // Opening price
    const change = currentPrice - openPrice;
    const changePercent = (change / openPrice) * 100;

    return {
      price: currentPrice,
      change,
      changePercent
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(`Detailed error for ${symbol}:`, error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error(`Error fetching data for ${symbol}:`, error.message);
    } else {
      console.error(`Unknown error for ${symbol}:`, error);
    }
    throw error;
  }
}

export async function GET() {
  try {
    const now = Date.now();
    
    // Return cached data if it's still valid
    if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json(cachedData);
    }

    // Fetch data for each ticker sequentially
    const indices = [];
    for (const index of MARKET_INDICES) {
      try {
        const data = await fetchTickerData(index.symbol);
        indices.push({
          ...index,
          ...data
        });
        
        // Add a delay between requests
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Error fetching data for ${index.symbol}:`, error instanceof Error ? error.message : String(error));
        // Fallback to mock data if API fails
        const basePrice = Math.random() * 30000 + 1000;
        const change = (Math.random() - 0.5) * 100;
        indices.push({
          ...index,
          price: basePrice,
          change,
          changePercent: (change / basePrice) * 100,
        });
      }
    }

    // Cache the results
    cachedData = indices;
    lastFetchTime = now;

    return NextResponse.json(indices);
  } catch (error) {
    console.error('Error fetching market data:', error instanceof Error ? error.message : String(error));
    
    // If API fails, try to return cached data even if expired
    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}
