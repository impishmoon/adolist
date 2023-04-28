import crypto from "crypto";
import psqlQuery, { psqlInsert } from "@/serverlib/psql-conn";
import { randomId } from "@/sharedlib/essentials";

export default class BoardsSQL {
  static async getById(id: string) {
    const data = (await psqlQuery("SELECT * FROM users WHERE id=$1", [
      id,
    ])) as any;

    return data[0];
  }

  static async getByOwnerId(id: string) {
    const data = (await psqlQuery("SELECT * FROM boards WHERE ownerid=$1", [
      id,
    ])) as any;

    return data;
  }

  static async create(username: string, password: string, email?: string) {
    const newId = randomId();

    let hash = randomId(64);

    await psqlInsert("users", {
      id: newId,
      username,
      password: `${hash}${crypto
        .createHash("sha256")
        .update(hash + password)
        .digest("hex")}`,
      email,
      timecreated: Date.now(),
    });

    return newId;
  }
}
