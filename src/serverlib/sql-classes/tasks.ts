import psqlQuery, { psqlInsertMultiple } from "@/serverlib/psql-conn";
import { randomId } from "@/sharedlib/essentials";
import TaskType from "@/types/server/board/task";

export default class TasksSQL {
  static async getById(id: string) {
    const data = (await psqlQuery("SELECT * FROM tasks WHERE id=$1", [
      id,
    ])) as any;

    return data[0] as TaskType;
  }

  static async getByOwnerId(id: string) {
    const data = (await psqlQuery("SELECT * FROM tasks WHERE ownerid=$1", [
      id,
    ])) as any;

    return data;
  }

  static async create(ownerid: string, updatedby: string, tasks: TaskType[]) {
    const newId = randomId();

    await psqlInsertMultiple(
      "tasks",
      tasks.map((task) => ({
        ...task,
        id: randomId(),
        ownerid,
        timecreated: Date.now(),
        timeupdated: Date.now(),
        updatedby,
      }))
    );

    return newId;
  }
}
