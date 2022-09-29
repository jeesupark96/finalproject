require('dotenv/config');
const db = require('./db');
const ClientError = require('./client-error');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

app.get('/api/final-project-spot/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId || userId < 0) {
    throw new ClientError(400, 'postId must be a positive integer');
  }

  const sql = `
    select
      "p"."postId",
      "p"."title",
      "p"."artistName",
      "p"."artPhotoUrl",
      "p"."reported",
      "p"."userId",
      "sp"."createdAt" as "saved",
      "sp"."userId" as "saver"
    from "posts" as "p"
    left join "savedPosts" as "sp" using ("postId")
    where "p"."userId" = $1
      and "p"."deleted" is NULL
    order by "p"."createdAt" DESC, "postId" DESC;
  `;

  const params = [userId];
  db.query(sql, params)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => next(err));
});
