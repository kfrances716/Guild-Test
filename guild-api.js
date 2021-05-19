const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const { errorMiddleware } = require('./errorMiddleware');

const mongoUri = "mongodb://mongodbGuild:27017/mongodb";
const port = 3000

mongoose.connect(
    mongoUri,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    },
)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

const app = express();
app.use(express.urlencoded({ limit: 300, extended: true }));
app.use(express.json());
app.use('/api', routes);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`API started on port: ${port}`);
});

module.exports = app;
