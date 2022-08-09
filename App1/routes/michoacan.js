const express = require ('express');
const michoacan = express.Router();
const db = require('../config/database')

michoacan.get('/', async (req, res, next) => {
    const data = await db.query("SELECT SUM(Frecuencia) FROM homicidiosmichoacan"); 
    return res.status(200).json({ code: 1, message: data });
});

michoacan.get('/all', async (req, res, next) =>{
    const emple = await db.query("SELECT * FROM homicidiosmichoacan;");   
    return res.status(200).json({ code: 1, message: emple });
});

michoacan.get('/:name([A-Za-z]+)', async (req, res, next) =>{
    const name = req.params.name;
    const emple = await db.query("SELECT * FROM empleados WHERE emp_name='"+ name +"';");
    if (emple.length > 0 ) {   
        return res.status(200).json({ code: 1, message: emple });
    } 
    return res.status(404).send({ code: 404, message: "Empleado no encontrado"  });
});


module.exports = michoacan;