import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add a note:
export const putDb = async (content) =>
  await db.add('notes', {
    title: 'text',
    date: new Date,
    body: content,
  });

// get all notes from db
export const getDb = async () => console.log(await db.getAllFromIndex('notes', 'date', 'body'));;

initdb();
