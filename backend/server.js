const express = require("express");
const cors = require("cors");
const categoriesRouter = require("./routes/categories");
const imagesRouter = require("./routes/images");

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Servidor rodando corretamente!");
});

app.use("/categories", categoriesRouter);
app.use("/images", imagesRouter);

// Rota para gerar link público de imagens existentes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
