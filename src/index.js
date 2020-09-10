const express = require('express')
const app = express()
const server = require('http').createServer(app)
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

const resolvers = require('./graphql/resolver')
const schema = require('./graphql/schema.gql')

const config = require('./config/config')

mongoose.connect(config.db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('db connected')
})

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}))


server.listen(config.port, () => console.log('sv on port 8081'))