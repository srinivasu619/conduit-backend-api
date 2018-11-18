const express = require('express')
const {
    db
} = require('./src/db');
const app = express();

app.use(express.json());

app.use('/api', require('./src/routes/api'));


db.sync()
    .then(() => {

        app.listen(3000, () => {
            console.log('Started on http://localhost:3000');
        })

    })
    .catch(console.error)