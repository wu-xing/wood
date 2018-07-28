declare interface Article {
  id: number;
  content: string;
  createdAt: number;
  isEncryption: boolean;
  updatedAt: number;
}

declare interface ArticleDocument {
  title: string;
  content: string;
}
