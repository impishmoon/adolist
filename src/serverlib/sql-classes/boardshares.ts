import psqlQuery, { psqlDelete, psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/sharedlib/essentials";
import UserType from "@/types/client/board/user";
import BoardType from "@/types/server/board/board";

export default class BoardSharesSQL {
  static async getById(id: string) {
    const data = (await psqlQuery("SELECT * FROM boardshares WHERE id=$1", [
      id,
    ])) as any;

    return data[0] as BoardType;
  }

  static async getUserShares(boardid: string) {
    const data = (await psqlQuery(
      "SELECT users.id, users.username FROM boardshares INNER JOIN users ON users.id = boardshares.userid WHERE boardshares.boardid=$1",
      [boardid]
    )) as any;

    return data as UserType[];
  }

  static async delete(id: string) {
    await psqlDelete("boardshares", {
      id,
    });
  }

  static async create(boardid: string, userid: string) {
    const newId = randomId();

    await psqlInsert("boardshares", {
      id: newId,
      boardid,
      userid,
      timecreated: Date.now(),
    });

    return newId;
  }
}
