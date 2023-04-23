import { app } from './app';
import { JWT_KEY, DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USERNAME } from './env';
import { createTables, createUserAdmin, pool } from './store/db';

if (!JWT_KEY) {
  throw new Error('JWT_KEY must be defined');
}

if (!DB_DATABASE && !DB_HOST && !DB_PASSWORD && !DB_USERNAME) {
  throw new Error(
    'DB_DATABASE, DB_HOST, DB_PASSWORD and DB_USERNAME must be defined'
  );
}

pool.connect(async (err, client) => {
  if (err) {
    console.error('Error connecting to database: ', err.stack);
  } else {
    console.log('Connected to database');
    await createTables(client);
    await createUserAdmin(client);
  }
});

app.listen(3000, () => {
  console.log('Server on port 3000');
});
