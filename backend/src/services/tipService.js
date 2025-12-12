import { readDb, writeDb } from "../../database/database.js";
import crypto from "node:crypto";

export default {
  async findAll() {
    const db = await readDb();
    return db.tips
  },

  async create({ title, userId }) {
    const db = await readDb();
    const tipId = crypto.randomUUID()
    const newTip = {id: tipId, title: title, userId: userId};
    db.tips.push(newTip);
    await writeDb(db);
    return tipId
  },

  async update({ id, title, userId }) {
    const db = await readDb();
    const tipToUpdate = db.tips.find(tip => tip.id === id && tip.userId === userId);    
      if (!tipToUpdate) {
          return false;
      } else {
          Object.assign(tipToUpdate, {title: title});
          await writeDb(db);
          return true;
      }
  },

  async remove({ id, userId }) {
    const db = await readDb();

    let index = -1
      for (let i=0; i<db.tips.length; i++) {
          if (db.tips[i].id === id && db.tips[i].userId === userId) {
              index = i;
              break;
          }
      }
      if (index === -1) {
          return false;
      }
      db.tips.splice(index, 1);
      await writeDb(db);
      
      return true;
  },
};
