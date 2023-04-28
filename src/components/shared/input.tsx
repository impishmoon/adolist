import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import css from "./input.module.scss";
import classNames from "classnames";

const Input: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = ({ className, ...props }) => {
  return <input {...props} className={classNames(css.root, className)} />;
};

export default Input;
