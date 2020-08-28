const express = require('express')
const app = express()
const server = require('http').createServer(app)
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')

const resolvers = require('./graphql/resolver')
const schema = require('./graphql/schema.gql')

mongoose.connect('mongodb://localhost:27017/zwitter', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('db connected')
})

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}))


server.listen(process.env.PORT || 8081, () => console.log('sv on port 8081'))