export type Router = {
  replacePage: (path: string) => void;
  pushPage: (path: string) => void;
  current: HistoryState
}

export type Path = `/${string}`;
export type HistoryState = {
  currentPage: Path
};
