const mysql = require('./db');

const Users = function (user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
};

Users.getAllUsers = (result) => {
    mysql.query("SELECT * FROM users", (error, response) => {
        if (error) {
            result(error);
        } 

        result(null, response);
    });
}

Users.findByEmail = (email, result) => {
    mysql.query("SELECT * FROM users WHERE email = ?", [email], (error, response) => {
        if(error) {
            result(error);
        }

        result(null, response);
    })
}

Users.addUser = (user, result) => {

    mysql.query("SELECT * FROM users WHERE email = ? ", [user.email], (error, response) => {

        if(error) {
            return result(error)
        }
        
        if (response.length > 0) {
            return result(new Error("User allready exits"));
        }
        
        mysql.query(
            "INSERT INTO users (name, email, password) VALUES (?,?,?)",
            [user.name, user.email, user.password],
            (error, response) => {
                if(error) {
                    return result(error)
                }

                return result(null, response);
            }
        )
    })
}

module.exports = Users;