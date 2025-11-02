import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  condition: any;
};

export const RenderIf: FC<Props> = ({ children, condition }) => {
  if (!condition) {
    return null;
  }

  return children;
};