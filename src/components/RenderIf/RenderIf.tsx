import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  condition: any;
};

export const RenderIf = ({ children, condition }: Props) => {
  if (!condition) {
    return null;
  }

  return children;
};
