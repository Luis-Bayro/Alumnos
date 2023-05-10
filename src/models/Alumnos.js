const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlumnoSchema = new Schema({
    Nombre: {type : String, required: true},
    promedio: {type : Number, required: true},
    Universidad: {type: String , required: true}
})

module.exports = mongoose.model('Alumno',AlumnoSchema);  