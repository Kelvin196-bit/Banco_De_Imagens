const express = require("express")
const cors = require("cors")
const categoriesRouter = require("./routes/categories")
const imagesRouter = require("./routes/images");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/categories", categoriesRouter);
app.use("/images", imagesRouter);
app.use("/uploads", express.static("uploads"));

app.listen(3001, () =>{ console.log("servidor rodando na porta 3001")})
