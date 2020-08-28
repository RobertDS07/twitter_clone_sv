module.exports = {
    secret: process.env.SECRET || 'jashdjksahdjkash18237128',
    db: process.env.DB || 'mongodb://localhost:27017/zwitter',
    port: process.env.PORT || 8081
}