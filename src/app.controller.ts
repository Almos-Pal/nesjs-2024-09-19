import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { quotesData } from './quotes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('quotes')
  @Render('quotes')
  getAllQuotes() {
    return {
      quotes: quotesData
    };
  }
  @Get('randomQuote')
  @Render('randomQuote')
  getRandomQuote() {
    const randomQuote = quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
    console.log(randomQuote);
    return {
      quote: randomQuote
    };

  }
  @Get("topAuthors")
  @Render("topAuthors")
  getTopAuthors() {
    const authors = quotesData.quotes.map(quote => quote.author);
    const authorDict: { [key: string]: number } = {};
    authors.forEach(author => {
      if(authorDict[author]) {
        authorDict[author] += 1;
      } else {
        authorDict[author] = 1;
      }
    });
    
    const sortedAuthorDict = Object.entries(authorDict)
    .sort(([, a], [, b]) => b - a)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  return { authorDict: sortedAuthorDict };
  }
  @Get('quotes/:id')
  @Render('quote')
  oneQuote(@Param('id') id: string) {
    const quote = quotesData.quotes.find(quote => quote.id === parseInt(id));
    return {quote};
}
}
