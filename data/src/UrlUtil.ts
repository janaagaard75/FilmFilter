export class UrlUtil {
  public static removeStandardPrefix(url: string): string {
    const standardUrlPrefix = 'http://www.kino.dk/'
    const slicedUrl = url.slice(standardUrlPrefix.length)
    return slicedUrl
  }
}