require('dotenv/config');
const db = require('./db');

const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);

app.get('/api/spots', (req, res, next) => {
  const sql = `
    select
      "s"."eventName",
      "s"."description",
      "s"."photoUrl",
      "u"."firstName",
      "sp"."createdAt" as "saved",
      "sp"."userId" as "saver"
    from "spots" as "s"
    join "users" as "u" using ("userId")
    where "s"."deleted" is NULL
    order by "s"."createdAt" DESC, "s"."spotId" DESC;
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
