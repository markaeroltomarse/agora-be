var mysql      = require('mysql2');

var connection = mysql.createPool({
    host     : 'localhost',
    port     : '6033',
    user     : 'root',
    password : 'tagalog233',
    database : 'conferencedb'
});


module.exports = (query) => {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, sql) => {
            if (err) {
                console.error(err)
                return
            }

            sql.query(query, (err, result) => {
                if(err) {
                    console.error(err)
                    reject(err)
                    throw new Error(err)
                } else {
                    resolve(result)
                }

                sql.release()
            })
        })
    })
}