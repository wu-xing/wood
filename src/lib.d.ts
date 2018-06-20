/// <reference> node.d.ts
declare module 'ramda/src/values';


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
