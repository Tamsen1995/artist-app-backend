import {
  createAlbum,
  createArtist,
  getAlbumsByArtist,
  getAllArtists,
  initializeDb,
} from './database';
import express, { Request, Response } from 'express';

const app = express();
const port = 3001;
const cors = require('cors');

initializeDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize the database:', err);
  });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API Endpoints
app.post('/artists', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send('Artist name is required');
    }

    const artistId = await createArtist(name);
    res.status(201).json({ id: artistId, name: name });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/albums', async (req: Request, res: Response) => {
  try {
    const { artistId, name, releaseDate, price } = req.body;

    if (!artistId || !name || !releaseDate || !price) {
      return res.status(400).send('Missing required album information');
    }

    const albumId = await createAlbum(artistId, name, releaseDate, price);
    res.status(201).json({ id: albumId, artistId, name, releaseDate, price });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/artists', async (req: Request, res: Response) => {
  try {
    console.log('getting artists');
    const artists = await getAllArtists();
    res.json(artists);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/artists/:artistId/albums', async (req: Request, res: Response) => {
  try {
    const artistId = parseInt(req.params.artistId);

    if (isNaN(artistId)) {
      return res.status(400).send('Invalid artist ID');
    }

    const albums = await getAlbumsByArtist(artistId);
    res.json(albums);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Internal Server Error');
  }
});
