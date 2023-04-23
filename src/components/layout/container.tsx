import { FC, ReactNode } from "react";
import css from "./container.module.scss";

type Props = {
  children: ReactNode;
};

const LayoutContainer: FC<Props> = ({ children }) => {
  return <div className={css.root}>{children}</div>;
};

export default LayoutContainer;
