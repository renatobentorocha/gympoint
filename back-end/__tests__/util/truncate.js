import database from '../../src/database';

export default function truncate() {
  return Promise.all(
    Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: true,
        force: true,
      });
    })
  );
}

export async function disable_foreign_keys_checkin_before(call) {
  await database.connection.query('PRAGMA foreign_keys = OFF');
  await call();
  await database.connection.query('PRAGMA foreign_keys = ON');
}
