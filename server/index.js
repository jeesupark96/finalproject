require('dotenv/config');
const db = require('./db');
const sharp = require('sharp');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./public/ client-error');
const uploadsMiddleware = require('./uploads-middleware');

const app = express();

app.use(staticMiddleware);

app.get('/api/spots', (req, res, next) => {
  const sql = `
   select
     "s"."spotId",
     "s"."eventName",
     "s"."description",
     "s"."photoUrl",
     "s"."createdAt",
     "s"."userId" as "name",
     "u"."firstName",
     "u"."userId",
     "s"."lat",
     "s"."lng"
   from "spots" as "s"
   join "users" as "u" using ("userId")
   order by "createdAt" DESC, "userId" DESC;
 `;
  db.query(sql)
    .then(response =>
      res.json(response.rows))
    .catch(err => next(err));
});

app.get('/api/spots/:spotId', (req, res, next) => {
  const spotId = Number(req.params.spotId);
  if (!spotId) {
    throw new ClientError(400, 'spotId must be a positive integer');
  }
  const sql = `
    select "s"."eventName",
           "s"."photoUrl",
           "s"."description",
           "s"."userId" as "name",
           "s"."spotId",
           "u"."userId",
           "u"."firstName",
           "u"."lastName"
      from "spots" as "s"
      join "users" as "u" using ("userId")
      where "spotId" = $1
  `;
  const params = [spotId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find spot with spotId ${params}`);
      }
      res.json(result.rows[0]);

    })
    .catch(err => next(err));
});
app.post('/api/post-pin', uploadsMiddleware, (req, res, next) => {
  const { title, name, description, lat, lng, userId } = req.body;

  if (!title) {
    throw new ClientError(400, 'street art title is a required field');
  }
  if (!name) {
    throw new ClientError(400, 'artist name or tag is a required field');
  }
  if (!description) {
    throw new ClientError(
      400,
      'description or information is a required field'
    );
  }
  if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
    throw new ClientError(
      400,
      'lat and lng are required fields and must be numerical values'
    );
  }
  if (!userId | userId < 0) {
    throw new ClientError(
      400,
      'a valid userId is required, please sign in or create an account'
    );
  }
  if (!req.file) {
    throw new ClientError(400, 'an image upload is required');
  }

  // Resize and compress image uploads using sharp:
  const { filename: image } = req.file;

  sharp(req.file.path)
    .resize({ width: 1000, withoutEnlargement: true })
    .rotate()
    .jpeg({ force: false, mozjpeg: true })
    .png({ force: false, quality: 70 })
    .webp({ force: false, quality: 70 })
    .toFile(
      path.resolve(req.file.destination, 'resized', image)
    )
    .then(data => {
      const url = `/images/resized/${req.file.filename}`;

      const sql = `
      INSERT INTO "posts"
        (
          "title",
          "firstName",
          "photoUrl",
          "description",
          "lat",
          "lng",
          "userId"
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
      const params = [title, name, url, description, lat, lng, userId];

      return db.query(sql, params);
    })
    .then(response => {
      const [spots] = response.rows;
      res.status(201).json(spots);
    })
    .catch(err => next(err));
});
app.listen(3000, (req, res) => {

  // eslint-disable-next-line no-console
  console.log('Listening at Port 3000');
});
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
