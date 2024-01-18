import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
  return open({
    filename: './mydb.sqlite3',
    driver: sqlite3.Database,
  });
}

export async function initializeDb() {
  const db = await openDb();

  await db.exec(`CREATE TABLE IF NOT EXISTS artists (
    artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS albums (
    album_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    release_date DATE,
    price DECIMAL,
    FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
  )`);
}

export async function getAllArtists() {
  const db = await openDb();
  console.log('here?');
  return db.all('SELECT * FROM artists');
}

export async function createArtist(name: string) {
  const db = await openDb();
  const result = await db.run('INSERT INTO artists (name) VALUES (?)', [name]);
  return result.lastID;
}

export async function getAlbumsByArtist(artistId: number) {
  const db = await openDb();
  return db.all('SELECT * FROM albums WHERE artist_id = ?', [artistId]);
}

export async function createAlbum(
  artistId: number,
  name: string,
  releaseDate: string,
  price: number
) {
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO albums (artist_id, name, release_date, price) VALUES (?, ?, ?, ?)',
    [artistId, name, releaseDate, price]
  );
  return result.lastID;
}
