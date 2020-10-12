const express = require('express');
const mysql = require('mysql');

const END_POINTS = {
    service1Url: process.env.NODEJS_REST_ENTRY_POINT_EXAMPLE_URL || 'http://localhost:5010',
    service2Url: process.env.NODEJS_REST_PROPAGATOR_EXAMPLE_URL || 'http://localhost:5011',
    service3Url: process.env.NODEJS_REST_SINK_EXAMPLE_URL || 'http://localhost:5012'
};

function createMySqlConnection() {
    return mysql.createConnection({
        host: process.env.MYSQL_URL || 'localhost',
        user: 'root',
        password: 'root'
    });
}

let mySqlInitiated = false;
function initMySql() {
    console.log('---- mysql init ----');
    const connection = createMySqlConnection();

    connection.connect(err => {
        if (err) {
            console.error('error connecting to mysql: ' + err.stack);
            return;
        }

        console.log('mysql new connection created, connected as id ' + connection.threadId);
        connection.query("CREATE DATABASE test", err => {
            if (err && err.code !== 'ER_DB_CREATE_EXISTS') {
                console.error('error creating mysql database: ' + err.stack);
                return;
            }
            console.log("Database mysql created");

            connection.query("USE test", err => {
                if (err) {
                    console.error('error choosing database in mysql: ' + err.stack);
                    return;
                }

                console.log("mysql `test` database chosen");
                const sql = "CREATE TABLE testtable (id int PRIMARY KEY,name VARCHAR(255), age int)";
                connection.query(sql, err => {
                    if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') {
                        console.error('mysql error creating table: ' + err.stack);
                        return;
                    }

                    console.log("Table testtable created in mysql");
                    const sql = "INSERT INTO testtable (id, name, age) VALUES (1, 'test', 30)";
                    connection.query(sql, err => {
                        if (err && err.code !== 'ER_DUP_ENTRY') {
                            console.error('mysql error inserting to table: ' + err.stack);
                            return;
                        }

                        mySqlInitiated = true;
                        console.log("mysql - 1 record inserted to table");
                        console.log('---- mysql init finished ----');
                        //connection.destroy();
                        connection.end(() => {
                            console.log("connection id %d is terminated now", connection.threadId);
                        });
                    });
                });
            });
        });
    });
}

function executeMySqlQuery(connection, query, res, cb = () => {}) {
    connection.query("USE test", err => {
        if (err) {
            const msg = 'error choosing database in mysql: ' + err.stack;
            console.error('error choosing database in mysql: ' + err.stack);
            cb(msg);
            return;
        }

        console.log("mysql `test` database chosen");
        connection.query(query, (error, rows) => {
            if (error) {
                const msg = `mysql select query failed, err: ${error}`;
                if (res) { res.send(msg); }
                cb(msg);
                return;
            }

            cb(null, rows);
            if (res) {
                res.send(JSON.stringify({ title: 'Message', message: rows[0].name }));
            }
        });
    });
}

initMySql();

const app = express();

app.get('/mysql', (req, res) => {
    console.log('Got request to /');
    if (!mySqlInitiated) {
        res.status(500).send('mysql server setup was not initiated properly');
        return;
    }

    let query = 'SELECT * from `testtable` WHERE `id` = "' + (req.query.id === '1' ? req.query.id : 1) + '"';
    //initiate a new connection w/o closing it to simulate AppDoSDatabaseConnections
    const connection = createMySqlConnection();
    connection.connect(err => {
        if (err) {
            console.error('error connecting to mysql: ' + err.stack);
            return;
        }

        console.log('mysql new connection created, connected as id ' + connection.threadId);
        executeMySqlQuery(connection, query, null, (err, rows) => {
            if (err) {
                res.status(500).send(`mysql select query failed, err: ${err}`);
                return;
            }

            let query = 'SELECT * from `testtable` WHERE `name` = "' + rows[0].name + '"';
            executeMySqlQuery(connection, query, res);
        });
    });
});

const server = app.listen(5012);
server.on('listening', () => {
    console.log(new Date().toISOString() + ' App ready and listening to port ' + server.address().port);
});
