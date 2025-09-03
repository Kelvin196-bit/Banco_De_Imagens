import { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from "./Componentes/ImageGallery";

export default function Exibir() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(""); // estado da seleção
  const [images, setImages] = useState([]);

 // Buscar categorias do servidor apenas uma vez
  useEffect(() => {
    axios.get("http://localhost:3001/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Buscar imagens do servidor quando a categoria mudar
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    const url = selectedCategory && selectedCategory !== "todas"
      ? `http://localhost:3001/images?category_id=${selectedCategory}`
      : "http://localhost:3001/images";

    axios.get(url)
      .then((res) => {
        console.log("IMAGENS DO BACKEND:", res.data);
        setImages(res.data)})
      
      .catch((err) => console.error(err));
  };

  return (
   <>
   <div className="max-w-md mx-auto p-4 border rounded space-y-4 mt-10 mb-10">
      <h2>Categorias Cadastradas</h2>
      <select
        id="category"
        value={category}
        onChange={handleCategoryChange}
        className="w-full p-2 border rounded cursor-pointer"
      >
        <option value="">Selecione uma categoria</option>
        <option value="todas">Todas</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
    </div>
      <div className="max-w-6xl mx-auto p-2">
        {/* Vitrine separada em componente */}
        <ImageGallery images={images} />
      </div>
      </>
  );
}
