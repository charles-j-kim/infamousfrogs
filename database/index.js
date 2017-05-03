var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test';

// // Config for pooling
// var config = {
//   user: 'charleskim',
//   database: 'test',
//   host: 'localhost',
//   port: 5432,
//   max: 10,
//   idleTimeoutMillis: 30000
// };

var insert = function() {
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.error(err);
    }

    client.query('INSERT INTO users (username, user_ig_id, profile_url) VALUES (\'test_user6\', \'123345h\', \'http://www.google.com\')', function(err, result) {
      done(err);
      if (err) {
        console.error('error', err);
      } else {
        console.log('Successfully inserted username');
      }
    });
  });
};

var retrieve = function(callback) {
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.error(err);
    }

    client.query('SELECT * from users', function(error, result) {
      if (err) {
        console.error('error', err);
      } else {
        callback(result.rows);
      }
    });
  });
};

module.exports.insert = insert;
module.exports.retrieve = retrieve;