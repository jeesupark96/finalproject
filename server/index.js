require('dotenv/config');
const db = require('./db');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);

// app.get('/api/spots', (req, res, next) => {
//  const sql = `
//    select
//      "spotId",
//      "eventName",
//      "description",
//      "photoUrl",
//      "createdAt",
//      "userId"
//    from "spots"
//    order by "createdAt" DESC, "spotId" DESC;
//  `;
//
//  db.query(sql)
//    .then(response =>
//      res.json(response.rows))
//    .catch(err => next(err));
// });

app.get('/api/users', (res, next) => {
  const sql = `
    select
      "userId",
      "firstName",
       "lastName",
      "createdAt"
    from "users"
    order by "createdAt" DESC, "userId" DESC;
  `;

  db.query(sql)
    .then(response =>
      res.json(response.rows))
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
