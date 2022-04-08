export interface User {
  about: string;
  created: number;
  id: string;
  karma: number;
  submitted: number[];
}

export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export type StoryWithAuthor = Omit<Story, "by"> & {
  by?: User;
};
