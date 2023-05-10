const express = require('express');
const router = express.Router();

const Alumno = require('../models/Alumnos');

router.get('/',  async(req , res) => {
   
    const alumnos = await Alumno.find();
    res.json(alumnos);
    
});

router.get('/:id' , async (req,res) =>{
    const alumnos = await Alumno.findById(req.params.id)
    res.json(alumnos);
})

router.post('/', async(req,res) =>{
    const {Nombre,promedio,Universidad} = req.body;
    const alumno = new Alumno({
        Nombre,
        promedio,
        Universidad
    })
    await alumno.save();
    res.json({status: 'tarea guardada'})
})

router.put('/:id' , async(req,res) =>{
    const{Nombre,promedio,Universidad} = req.body;
    const newAlumno = {Nombre,promedio,Universidad};
    await Alumno.findByIdAndUpdate(req.params.id, newAlumno);
    res.json({status: 'Actualizado'});
});

router.delete('/:id' , async (req,res) => {
   await Alumno.findByIdAndRemove(req.params.id)
   res.json({status: 'Eliminado'})
})

module.exports = router;