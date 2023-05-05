import { NextApiResponseServerIO } from "@/types/next";
import type { NextApiRequest } from "next";
import { getLoginSession, setLoginSession } from "@/serverlib/auth";
import { ApiResponse } from "@/types/apiResponse";
import BoardsSQL from "@/serverlib/sql-classes/boards";
import BoardSharesSQL from "@/serverlib/sql-classes/boardshares";

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

  const session = await getLoginSession(req);
  if (session == null) {
    res.status(400).send({ error: "Not logged in" });
    return;
  }

  const boardId = req.body.boardId;
  const board = await BoardsSQL.getById(boardId);

  const search = req.body.search;
  if (search == null) {
    res.status(400).send({ error: "Missing search" });
    return;
  }

  if (search == "") {
    res.send({ data: [] });
    return;
  }

  if (board == null) {
    const userShares = await BoardSharesSQL.searchForUsersWithoutBoard(
      search,
      session.id
    );

    res.send({ data: userShares });
  } else {
    if (board.ownerid != session.id) {
      res.status(400).send({ error: "Only the board owner can share users" });
      return;
    }

    const userShares = await BoardSharesSQL.searchForUsers(
      search,
      boardId,
      session.id
    );

    res.send({ data: userShares });
  }
}
