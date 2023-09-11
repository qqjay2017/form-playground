declare module "@designable/react";

export declare type DnFC<P = unknown> = React.FC<P> & {
  Resource?: IResource[];
  Behavior?: IBehavior[];
};
