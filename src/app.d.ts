declare interface Article {
  id: string;
  content: string;
  createdAt: number;
  isEncryption: boolean;
  updatedAt: number;
}

declare interface ArticleDocument {
  title: string;
  content: string;
}

declare interface ArticleBox {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}
