export interface PostFields {
    id?: string;
    title: string;
    content?: string;
    slug:string;
    acfPosts:ACFPosts;
 
  }

  export interface ACFPosts{
    background?: Image;
    description?: string
  }
  export interface FeaturedHome{
    featuredhome?:boolean;
  }
  export interface Node{
    sourceUrl?:string;
  }
  export interface Image{
    node?: Node;
  }
  export interface HomeFields{
    titlePage: string;
    banner?: Image;
    aboutTitle:string;
    aboutText:string;
    aboutImg?:Image;
    aboutLocsTitle:string;
    aboutLocsText:string;
    postsTitle:string;
    btn:string
  }