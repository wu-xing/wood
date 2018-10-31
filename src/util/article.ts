import * as org from 'orgpr';

export function extractImageUrls(content: string): string[] {
  const iamgeUrls: string[] = [];
  content.replace(/image-url:([\S]+)]]/g, (substring: string, imageurl: string) => {
    iamgeUrls.push(imageurl);
    return '';
  });
  return iamgeUrls;
}

export function extractUrlHash(url: string): string {
  const spliteds: string[] = url.split('/');
  return spliteds[spliteds.length - 1];
}

export function replaceArticleImageUrl(title: string, content: string): string {
  return content.replace(/image-url:([\S]+)]]/g, (substring: string, imageurl: string) => {
    const hash: string = extractUrlHash(imageurl);
    return 'image-url:./' + title + '/' + hash + ']]';
  });
}

export function parseOrgCode(
  article: Article
): {
  title: string;
  html: string;
} {
  const parser = new org.Parser();
  const orgDocument = parser.parse(article.content);
  const orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
    headerOffset: 1,
    exportFromLineNumber: false,
    suppressSubScriptHandling: false,
    suppressAutoLink: false
  });

  return {
    title: orgHTMLDocument.title,
    html: orgHTMLDocument.toString()
  };
}
