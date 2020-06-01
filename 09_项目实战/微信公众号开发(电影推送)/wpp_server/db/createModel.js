module.exports = (mongoose) =>{
    return (schema_options) => {
        const schema = new mongoose.Schema(schema_options)
        return (model_name) => mongoose.model(model_name, schema)
    }
}