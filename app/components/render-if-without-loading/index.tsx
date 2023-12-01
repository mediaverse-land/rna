import { ReactNode, memo } from "react";

type Props = {
  condition: boolean;
  children: ReactNode;
  id?: string;
};

const RenderIfWithoutLoadingMemo = ({ condition, children }: Props) => {
  return <>{condition === true ? children : null}</>;
};

export const RenderIfWithoutLoading = memo(RenderIfWithoutLoadingMemo);
