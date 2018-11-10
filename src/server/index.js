require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql-server');
const app = express();
const cors = require('cors'); 

// allow cross-origin requests while in development mode and while running the front and back
// end on the same computer. Without cors, the front end can't make requests to the server
app.use(cors()) 

const mongoose = require('mongoose');
const Mongo_URI = process.env.MONGO_URI;

mongoose.connect(Mongo_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('connected to database'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: false //Set to true to view GraphiQl in browser at /graphql
}));

app.listen(4000, () => {
  console.log('Listening on 4000')
});
