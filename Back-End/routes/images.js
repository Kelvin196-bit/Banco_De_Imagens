const express = require("express");
const router = express.Router();
const multer = require("multer"); // Express não entende arquivos, por isso usa-se o multer
const db = require("../db");

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Listar imagens, possivelmente filtradas por categoria
router.get("/", (req, res) => {
    const category_id = req.query.category_id;

    // transforma em número
    const catId = parseInt(category_id);

    console.log("Categoria recebida na query:", catId); // debug



    let sql = "SELECT * FROM images";
    const params = [];

    if (catId && catId !== 0) {
        sql += " WHERE category_id = ?";
        params.push(catId); // aqui você pode enviar o id da categoria direto do frontend
    }

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});


// Upload de imagens
router.post("/", upload.single("image"), (req, res) => {
    const { category } = req.body;

    console.log("Categoria recebida:", category); // debug

    if (!req.file) {
        return res.status(400).json({ error: "Nenhuma imagem foi enviada" });
    }

    db.query("SELECT id FROM categories WHERE name = ?", [category], (err, results) => {
        if (err) 
            return res.status(500).json(err);
        if (results.length === 0) {
            return res.status(400).json({ error: "Categoria não encontrada" });
        }

        const categoryId = results[0].id;
        const filePath = req.file.filename;

        db.query(
            "INSERT INTO images (category_id, path) VALUES (?, ?)",
            [categoryId, filePath],
            (err2, result2) => {
                if (err2) return res.status(500).json(err2);

                res.json({
                    id: result2.insertId,
                    category_id: categoryId,
                    path: filePath
                });
            }
        );
    });
});

module.exports = router;
