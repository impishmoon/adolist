import { parse } from "cookie";

const getAuthCookie = () => {
  const cookies = parse(document.cookie);
  if ("account" in cookies) {
    return cookies["account"];
  }

  return "";
};

export default getAuthCookie;
