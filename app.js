const express = require("express")
const  graphqlHTTP   = require("express-graphql").graphqlHTTP
const mongoose = require("mongoose")
const graphqlSchema = require("./graphql/schema")
const graphqlResolvers = require("./graphql/resolvers")

const app = express();

app.get("/test", (req, res) => {
    return res.send("HI");
    console.log("here")
})

app.use(
  '/graphql',
  graphqlHTTP ({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);


const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@graphql-api.fyhgt.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
.connect(uri, options)
.then(() => app.listen(9000, () => console.log("Server is running on localhost:9000")))
.catch(error => {
    throw error
})


