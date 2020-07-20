const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/sense_musice', { useMongoClient: true })
mongoose.connection.once("open", () => console.log('数据库连接成功'))
mongoose.connection.once("close", () => console.log('数据库连接断开'))

module.exports = function (model_object) {
    const schema = new mongoose.Schema(model_object)
    return (model_name) => mongoose.model(model_name, schema)
}