require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema.js');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const Mongo_URI = process.env.MONGO_URI;

mongoose.connect(Mongo_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('connected to database'))

app.use(bodyParser.json())

const GraphQLServer = graphqlHTTP({
  schema,
  graphiql: true //Set to true to view GraphiQl in browser at /graphql
})

app.get('/reservation/id', (req, res, next) => {
  console.log(res.data)
  console.log(req.data)
  console.log(req.query)
  console.log(res.query)
  next()
},GraphQLServer);
app.get('/reservations', GraphQLServer);
app.post('/reservation', GraphQLServer);
app.use('/graphql', (req, res, next) => {
  console.log(req.query);
  // console.log(req.body)
  next(); 
},GraphQLServer)

app.listen(4000, () => {
  console.log('Listening on 4000')
});
