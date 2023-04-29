import crypto from "crypto";
import psqlQuery, { psqlInsert, psqlUpdate } from "@/serverlib/psql-conn";
import { randomId } from "@/sharedlib/essentials";
import BoardType from "@/types/server/board/board";

export default class BoardsSQL {
  static async getById(id: string) {
    const data = (await psqlQuery("SELECT * FROM boards WHERE id=$1", [
      id,
    ])) as any;

    return data[0] as BoardType;
  }

  static async getByOwnerId(id: string) {
    const data = (await psqlQuery("SELECT * FROM boards WHERE ownerid=$1", [
      id,
    ])) as any;

    return data as BoardType[];
  }

  static async setName(id: string, name: string) {
    await psqlUpdate(
      "boards",
      {
        name,
      },
      {
        id,
      }
    );
  }

  static async create(ownerid: string, name: string) {
    const newId = randomId();

    await psqlInsert("boards", {
      id: newId,
      ownerid,
      name,
      timecreated: Date.now(),
      timeupdated: Date.now(),
    });

    return newId;
  }
}
