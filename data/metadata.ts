import { todaysQuote } from '../constant/quote';

const metadata = {
  title: '땃쥐의 개발블로그',
  quote: `${todaysQuote.quote}`,
  authors: `${todaysQuote.author}`,
  description: "who's blog",
  author: 'Bizbaeja'
} as const;

export default metadata;
