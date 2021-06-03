const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Boom = require('@hapi/boom');
const HAPIWebSocket = require("hapi-plugin-websocket");
const MySQL = require('mysql');

const isDev = process.env.ENV === 'DEV'

const connection = MySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'fyp'
});


async function main() {
    let data = {}
    let connections = new Set()

    const server = Hapi.server({
        port: process.env.PORT || 4000,
        host: process.env.HOST || '0.0.0.0',
        routes: { cors: { origin: ["*"] } }
    });

    await server.register(HAPIWebSocket)
    await server.register(Vision)

    server.route({
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            const authdata = request.payload;
            console.log(authdata)
            const username = authdata.username;
            const password = authdata.password;
            console.log(username)
            if (username.charAt(0) == "2") {
                console.log("hi")
                let sql = 'SELECT * FROM student WHERE student_id = "' + username + '" and password = "' + password + '"'
                return new Promise((resolve, reject) => {
                    connection.query(sql, (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(JSON.stringify(result));
                    });
                });
            }
            else {
                let sql = 'SELECT * FROM teacher WHERE teacher_id = "' + username + '" and password = "' + password + '"'
                return new Promise((resolve, reject) => {
                    connection.query(sql, (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(JSON.stringify(result));
                    });
                });
            }

        },
    })

    // routes

    server.route({
        method: 'POST',
        path: '/getstudent',
        handler: (request, h) => {
            const id = request.payload.student
            //   sql = 'SELECT * FROM student WHERE student_id = "' + id + '"';
            sql = 'SELECT * FROM student';
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.stringify(result));
                });
            });
        },
    })

    const getnewdata = (id) => {
        let sql2 = 'SELECT * FROM student WHERE student_id = "' + id + '"';
        data = new Promise((resolve, reject) => {
            connection.query(sql2, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.stringify(result));

            });
        });
    }

    server.route({
        method: 'GET',
        path: '/getallstudent',
        handler: (request, h) => {
            sql = 'SELECT * FROM student'
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        },
    })

    server.route({
        method: 'POST',
        path: '/addscore',
        handler: (request, h) => {
            const diff = request.payload.diff;
            const student = request.payload.student;
            let mark = diff * 100;
            let money = diff * 1000;
            let id = parseInt(student) + 1 + 20000;
            console.log(id);
            sql = 'UPDATE student SET score = score + ' + mark + ', saving= saving +' + money + ' WHERE student_id = "' + id + '";'
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                        return reject(err);
                    }
                    resolve(result);
                });
            });

        },
    })

    server.route({
        method: 'POST',
        path: '/deductscore',
        handler: (request, h) => {
            const diff = request.payload.diff;
            const student = request.payload.student;
            let mark = diff * 100;
            let id = parseInt(student) + 1 + 20000;
            sql = 'UPDATE student SET score = score - ' + mark + ' WHERE student_id = "' + id + '";'
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    resolve(result)
                });
            });
        },
    })

    server.route({
        method: 'POST',
        path: '/buyporperty',
        handler: (request, h) => {
            const station = request.payload.station;
            const player = request.payload.player;
            let id = parseInt(station) + 30000;
            sql = 'UPDATE station SET sold = 0 , owner = "' + player + '" WHERE station_id = "' + id + '";'
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                        return reject(err);
                    }
                    resolve(result);
                });
            });

        },
    })


    server.route({
        method: 'POST',
        path: '/sellporperty',
        handler: (request, h) => {
            const station = request.payload.station;
            let id = parseInt(station) + 30000;
            sql = 'UPDATE station SET sold = 1 , owner = null WHERE station_id = "' + id + '";'
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                        return reject(err);
                    }
                    resolve(result);
                });
            });

        },
    })
    server.route({
        method: 'POST',
        path: '/addsaving',
        handler: (request, h) => {
            const player = request.payload.player;
            let id = parseInt(player)+1+20000;
            sql = 'UPDATE student SET saving = saving + 200 WHERE student_id = "' + id + '";'
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                        return reject(err);
                    }
                    resolve(result);
                });
            });

        },
    })
    
    server.route({
        method: 'POST',
        path: '/deductsaving',
        handler: (request, h) => {
            const player = request.payload.player;
            let id = parseInt(player) + 20000 +1;
            sql = 'UPDATE student SET saving = saving - 200 WHERE student_id = "' + id + '";'
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                        return reject(err);
                    }
                    resolve(result);
                });
            });

        },
    })

    server.route({
        method: 'POST',
        path: '/payrent',
        handler: (request, h) => {
            const student = request.payload.student;
            const id = parseInt(student) + 1 + 20000;
            sql = 'UPDATE student SET saving= saving - 120 WHERE student_id = "' + id + '";'
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                        return reject(err);
                    }
                    resolve(result);
                });
            });

        },
    })



    server.route({
        method: 'GET',
        path: '/teacher',
        handler: (request, h) => {
            const username = request.payload.username;
            connection.query('SELECT * FROM teacher WHERE account = "' + username + '" ', function (error, results, fields) {
                if (error) throw error;
                console.log(results);
                return results
            });
        },
    })

    server.route({
        method: 'POST',
        path: '/newquestion',
        handler: (request, h) => {
            const questiondetail = request.payload.question
            const answer = request.payload.answer
            const diff = request.payload.diff
            const ID = request.payload.ID_t
            console.log(questiondetail)
            let sql = "INSERT INTO `question` (`question_id`, `question`, `answers`, `difficulty`, `teacher_id`) VALUES (NULL, '" + questiondetail + "', '" + answer + "', '" + diff + "', '" + ID + "')"
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        },
    })

    server.route({
        method: 'get',
        path: '/getquestion',
        handler: (request, h) => {
            const difficult = request.query.difficult
            // let sql = 'SELECT * FROM question WHERE difficulty ="'+difficult+'";';
            let sql = 'SELECT * FROM question WHERE difficulty ="1";';
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.stringify(result));
                });
            });
        },
    })
    server.route({
        method: 'get',
        path: '/initgame',
        handler: (request, h) => {
            let sql = 'UPDATE station set sold = 1, owner = null;'
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.stringify(result));
                });
            });
        },
    })
    server.route({
        method: 'get',
        path: '/initstudent',
        handler: (request, h) => {
            let sql = 'UPDATE student set score = 500, saving = 1000 ;'
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.stringify(result));
                });
            });
        },
    })
    server.route({
        method: 'get',
        path: '/getstationdetail',
        handler: (request, h) => {
            const station = request.query.station;
            let id = parseInt(station) + 30000;
            let sql = 'SELECT * FROM station WHERE station_id =' + id + ';';
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.stringify(result));
                });
            });
        },
    })

    server.route({
        method: 'POST',
        path: '/ws',
        config: {
            response: { emptyStatusCode: 204 },
            payload: { output: "data", parse: true, allow: "application/json" },
            plugins: {
                websocket: {
                    only: true,
                    initially: true,
                    connect: ({ ws }) => {
                        connections.add(ws)
                    },
                    disconnect: ({ ws }) => {
                        connections.delete(ws)
                    }
                }
            }
        },
        handler: (request, h) => {
            let { initially, ws } = request.websocket()
            console.log("getconnection")
            // new connection 
            if (initially) {
                ws.send(JSON.stringify(data))
                return ""
            }

            // validation
            if (typeof request.payload !== "object" || request.payload === null)
                return Boom.badRequest("invalid request")
            if (typeof request.payload.path !== "string")
                return Boom.badRequest("invalid request")

            // handle payload
            let path = request.payload.path
            if (path === "ping") {
                return { result: "pong" }
            }

            return Boom.badRequest("Unhandled path")
        }
    })


    server.route({
        method: 'get',
        path: '/getstation',
        handler: (request, h) => {
            sql = "SELECT * FROM station";
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(JSON.stringify(result));
                });
            });
        },
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return
        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

main().catch(err => console.error(err));
