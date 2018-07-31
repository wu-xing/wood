/// <reference> node.d.ts
declare module 'ramda/src/values';
declare module 'ramda/src/sort';
declare module 'ramda/src/compose';
declare module 'jszip-utils';
declare module 'file-saver/FileSaver';


declare module "orgpr" {
  export var ConverterHTML: any;

  export interface OrgDocument {
    convert: (convertType: any, option: any) => any
    toString: () => string
  }

  export class Parser {
    parse: (value: string) => OrgDocument
  }
}
