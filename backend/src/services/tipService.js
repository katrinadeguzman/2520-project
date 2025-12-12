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
    // TODO: get ahold of the db using readDb();
    // TODO: find the INDEX of the tip in the db whose id & userId match the incoming id & userId
    // TODO: if there is no index (-1), return false.
    // TODO: otherwise, use splice to delete from db.tips the tip based on the index
    // TODO: write changes to database with await writeDb(db)
    // TODO: return true
  },
};
