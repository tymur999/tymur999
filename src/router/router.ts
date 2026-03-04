export type Router = {
  replacePage: (path: Path) => void;
  pushPage: (path: Path) => void;
  current: Path
}

export type Path = `/${string}`;

export const DEFAULT : Router = {
  current: window.location.pathname as Path,
  pushPage: function(){},
  replacePage: function(){}
};