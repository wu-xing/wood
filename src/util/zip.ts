import * as JSZipUtils from 'jszip-utils';

export function getBinaryContent(imageUrl: string): Promise<{ binary: any; url: string }> {
  return new Promise((resolve, reject) => {
    JSZipUtils.getBinaryContent(imageUrl, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          binary: data,
          url: imageUrl
        });
      }
    });
  });
}
