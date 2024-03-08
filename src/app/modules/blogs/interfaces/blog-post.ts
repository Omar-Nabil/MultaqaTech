export interface BlogPost {
  id: number;
 title: string;
 authorName: string;
 content: string;
 pictureUrl: string;
 categoryId: number;
 category: string;
 publishingDate: string;
 numberOfViews: number;
 tags: string[];
 comments: string[];
}
