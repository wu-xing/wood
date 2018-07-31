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
  return spliteds[spliteds.length - 1]
}

export function replaceArticleImageUrl(title: string, content: string): string {
  return content.replace(/image-url:([\S]+)]]/g, (substring: string, imageurl: string) => {
    const hash: string = extractUrlHash(imageurl);
    return './' + title + '/' + hash + ']]';
  });
}
