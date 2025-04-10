const Users = require('../model/user.model');

exports.getAllUser = (req, res) => {
    Users.getAllUsers((error, response) => {
        if (error) {
            return res.status(500).json({
                Success: false,
                message: "DataBase error",
                error: err
            })
        }
        res.status(200).json({ Success: true, users: response });
    });
}

exports.getSingleUser = (req, res) => {
    const email = req.params.id;

    Users.findByEmail(email, (error, response) => {
        if (error) {
            return res.status(500).json({
                Success: false,
                message: "DataBase error",
                error: err
            })
        }

        if (response.length === 0) {
            return res.status(400).json({ Success: false, message: "user not found" })
        }

        res.status(200).json({ Success: true, user: response[0] });
    })

}

exports.addUser = (req, res) => {
    
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ Success: false, message: "All fields are required!" })
    }

    const user = new Users({ name, email, password });

    Users.addUser(user, (error, response) => {
        if (error && error.message == "User allready exits") {
            return res.status(400).json({ Success: false, message: "Email allready exits" });
        } else if (error) {
            return res.status(500).json({ Success: false, message: "Database error", error: err });
        }

        res.status(201).json({ success: true, message: "User registered successfully!" })
    })

}
