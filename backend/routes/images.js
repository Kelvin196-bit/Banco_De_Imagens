const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary"); 
const db = require("../db");

const upload = multer({ storage });

// Listar imagens, possivelmente filtradas por categoria
router.get("/", async (req, res) => {
  try {
    const category_id = parseInt(req.query.category_id);
    let sql = "SELECT * FROM images";
    const params = [];

    if (category_id && category_id !== 0) {
      sql += " WHERE category_id = ?";
      params.push(category_id);
    }

    db.query(sql, params, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (err) {
    console.error("Erro ao listar imagens:", JSON.stringify(err, null, 2));
    res.status(500).json({ error: "Erro ao listar imagens", details: err });
  }
});

// Upload de imagens
router.post("/", async (req, res) => {
  try {
    // Faz upload do arquivo usando multer
    await new Promise((resolve, reject) => {
      upload.single("image")(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const { category } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Nenhuma imagem foi enviada" });
    }

    // Pega ID da categoria
    const categoryId = await new Promise((resolve, reject) => {
      db.query("SELECT id FROM categories WHERE name = ?", [category], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return reject(new Error("Categoria não encontrada"));
        resolve(results[0].id);
      });
    });

    const imageUrl = req.file.path; // URL do Cloudinary

    // Salva imagem no banco
    const insertResult = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO images (category_id, path) VALUES (?, ?)",
        [categoryId, imageUrl],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    // Retorna dados do upload
    res.json({
      id: insertResult.insertId,
      category_id: categoryId,
      path: imageUrl,
    });
  } catch (err) {
    console.error("Erro no upload de imagem:", JSON.stringify(err, null, 2));
    res.status(500).json({ error: err.message || "Erro ao enviar arquivo" });
  }
});

module.exports = router;
