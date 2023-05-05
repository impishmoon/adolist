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

  static async getSharedWithBoards(userid: string) {
    const data = (await psqlQuery(
      "SELECT boards.* FROM boards INNER JOIN boardshares ON boards.id = boardshares.boardid WHERE boardshares.userid=$1",
      [userid]
    )) as any;

    return data as BoardType[];
  }

  static async searchForUsersWithoutBoard(searchText: string, userId: string) {
    const data = (await psqlQuery(
      "SELECT users.id, users.username FROM users WHERE users.username LIKE $1 AND users.id != $2",
      [`%${searchText}%`, userId]
    )) as any;

    return data as UserType[];
  }

  static async searchForUsers(
    searchText: string,
    boardId: string,
    userId: string
  ) {
    const data = (await psqlQuery(
      "SELECT users.id, users.username FROM users WHERE users.username LIKE $1 AND NOT EXISTS (SELECT FROM boardshares WHERE boardshares.boardid=$2 AND boardshares.userid=users.id) AND users.id != $3",
      [`%${searchText}%`, boardId, userId]
    )) as any;

    return data as UserType[];
  }

  static async delete(boardid: string, userid: string) {
    await psqlDelete("boardshares", {
      boardid,
      userid,
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
