import BoardType from "./client/board/board";

type IndexProps = {
  username?: string;
  boards?: BoardType[];
};

export default IndexProps;

export type IndexPropsType = {
  props: IndexProps;
  setProps: (props: IndexProps) => void;
};
