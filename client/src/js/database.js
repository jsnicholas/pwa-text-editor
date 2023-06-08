import { openDB } from 'idb';

const initdb = async () =>
  // create a new db called 'jate'
  openDB('jate', 1, {
    // add db schema if it doesn't exist 
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // create object store w auto incrementing ID
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add a note:
export const putDb = async (content) => {
  // create connection to db
  const textDb = await openDB('jate', 1);

  //create a new transaction
  const tx = textDb.transaction('jate', 'readwrite');

  //open obj store
  const store = tx.objectStore('jate');
  // make req to update store
  const req = store.put({ id: 1, content: content });
  const res = await req;
  if (res === 1) {
    console.log("Data saved")
  } else {
    console.log("Error saving data")
  }
}
// get all notes from db
export const getDb = async () => {
  // create connection to db
  const txtDb = await openDB('jate', 1);

  //create a new transaction
  const tx = txtDb.transaction('jate', 'readonly');

  //open obj store
  const store = tx.objectStore('jate');

  const request = store.get(1);
  // return the content to be injected into editor, if it exists
  const result = await request;
  if (!result) {
    console.log("Database contains no content... yet")
  } else {
    return result.content;
  }


};


// start the db
initdb();
