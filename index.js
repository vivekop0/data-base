const express = require('express');
const jwt = require('jsonwebtoken');


const jwtPassword ="123345"
const app = express();
app.use(express.json());

const ALL_USERS = [
    {
        username: "vivek@gamil.com",
        password: "123",
        name: "vivek sarkar"
    },
    {
        username: "anshikak@gamil.com",
        password: "12345667",
        name: "anshika sarkar"
    },
    {
        username: "minu@gamil.com",
        password: "12334",
        name: "minu sarkar"
    },
    {
        username: "monu@gamil.com",
        password: "12323",
        name: "monu sarkar"
    }
];

function userExist(username, password) {
    return ALL_USERS.some((element) => {
        return username === element.username && password === element.password;
    });
}



app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExist(username, password)) {
        return res.status(403).json({
            msg: "User doesn't exist in our in-memory database"
        });
    }

    const token = jwt.sign({ username: username }, jwtPassword); // Call the function to get the secret key
    return res.json({
        token,
    });
});

app.get('/users', (req, res) => {
    const token = req.headers.authorization; // Fix the typo here
  
    try {
        const decoded = jwt.verify(token, generateSecretKey()); // Call the function to get the secret key
        const username = decoded.username;

        res.send('hello');
    } catch (err) {
  
        return res.status(403).json({
         user:ALL_USERS,
        });
    }
});


app.listen(3000, () => {
    console.log("Your server is running on http://localhost:3000");
});
