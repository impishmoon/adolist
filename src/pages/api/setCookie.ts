import { NextApiResponseServerIO } from "@/types/next";
import type { NextApiRequest } from "next";
import UsersSQL from "@/serverlib/sql-classes/users";
import { setLoginSession } from "@/serverlib/auth";
import { ApiResponse } from "@/types/apiResponse";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponseServerIO<ApiResponse>
) {
  try {
    req.body = JSON.parse(req.body);
  } catch {
    res.status(400).send({ error: "Missing body / not JSON" });
    return;
  }

  const username = req.body?.username;
  const password = req.body?.password;

  if (username == null || password == null) {
    res.status(400).send({ error: "Username or password is missing" });
    return;
  }

  const user = await UsersSQL.getByUsernameAndPassword(username, password);

  await setLoginSession(res, { id: user.id });

  res.send({ data: "success" });
}
