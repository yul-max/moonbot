import { cached } from 'sqlite3';
import { open } from 'sqlite';
import keys from './db_init.js';

const filename = './keys.db'

async function initDB() {
  try{
    const db = await open({
      filename,
      driver: cached.Database,
    });
    console.log(db);
    console.log('Connected to database.');
    console.log('Adding tables to DB.');
    try{
      db.run(keys);
    } catch(err) {
      console.log('Error creating table.');
      console.log(err);
    }

    return db;
  } catch(err) {
    console.log('Error connectong to the database.');
    console.log(err);
    return process.exit(1);
  }
}

module.expots = initDB();