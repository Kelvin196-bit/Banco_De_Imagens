const express = require("express");
const router = express.Router();
const db = require("../db");

//Listar toas as categorias

router.get("/", (req, res) => {
    db.query("SELECT * FROM categories" , (err, results) => {
        if (err) 
            return res.status(500).json(err);
        res.json(results)
        })
    })

// Aicionar nova categoria

router.post("/", (req, res) => {
    const {name} = req.body;
    console.log("Recebido do frontend:", name);
    db.query("INSERT INTO categories (name) VALUES (?)", [name], (err, result) => {
        if (err) 
            return res.status(500).json(err);
        res.json({id: result.insertId, name});
    })
})

module.exports = router;