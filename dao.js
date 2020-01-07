const Sqlite3 = require('sqlite3');
const Promise = require('bluebird');


function AppDAO(dbFilePath) {
    this.db = new Sqlite3.Database(dbFilePath, (error) => {
        if (error) {
            console.log('Could not connect to database', err);
        }
        else {
            console.log("Connected to database");

        }
    });
}

AppDAO.prototype.addNewEvent = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        this.db.run(sql, params, (error) => {
            if (error) {
                console.log('Error running sql ' + sql)
                console.log(error)
                reject({ status: false, message: error })
            } else {
                resolve({ status: true })
            }
        })
    });
}

module.exports = AppDAO;
