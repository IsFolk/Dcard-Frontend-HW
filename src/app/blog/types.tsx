// types.ts
// 會一直固定用到的東西
export interface Comments {
  user: string;
  content: string;
  avatar_url: string;
}

export interface Owner{
  login: string;
  avatar_url: string;
}
export interface Issue {
  owner: Owner;
  title: string;
  body: string;
  issue_number: number;
  state: string;
  comments: Comments[];
  labels: Labels[];
}

export interface Labels{
  name: string;
  color: string;
}