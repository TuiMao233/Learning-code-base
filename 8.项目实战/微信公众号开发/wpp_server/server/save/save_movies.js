// 引入数据库集合
const { MoviesModel, mongoose } = require('../../db')

module.exports = async function (arr_data) {
    console.log('------------向数据库添加数据-------------')
    const result = await MoviesModel.create(arr_data)
    console.log(`------------共添加:${result.length}条数据-------------`)
    return {Model:MoviesModel, mongoose, data:result}
}