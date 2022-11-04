require('dotenv/config');
const db = require('./db');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./public/ client-error');
const uploadsMiddleware = require('./uploads-middleware');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

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

app.post('/api/spots', jsonParser, (req, res, next) => {
  console.log('hello ');

  const { eventName, description, lat, lng } = req.body;
  console.log(req.body);
  if (!eventName) {
    throw new ClientError(400, 'spot title is a required field');
  }
  // if (!name) {
  //   throw new ClientError(400, ' name or tag is a required field');
  // }
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
  // if (!userId | userId < 0) {
  //   throw new ClientError(
  //     400,
  //     'a valid userId is required, please sign in or create an account'
  //   );
  // }
  // if (!req.file) {
  //  throw new ClientError(400, 'an image upload is required');
  // }

  // const url = `/images/${req.file.filename}`;

  const sql = `
      INSERT INTO "spots"
        (
          "eventName",
          "description",
          "lat",
          "lng"
        )
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
  const params = [eventName, description, lat, lng];

  db.query(sql, params)
    .then(response => {
      const [spots] = response.rows;
      res.status(201).json(spots);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
