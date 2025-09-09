import { useState, useEffect } from "react";
import axios from "axios";

export default function Cadastro() {
  // Busca do LocalStorage ou usa valores iniciais
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : ["Aniversário", "Natal"];
  });
  const [category, setCategory] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Função que busca categorias do backend
const URL_BASE = "https://snapstock.alwaysdata.net";
const handleGetCategories = async () => {
  try {
    const res = await axios.get(`${URL_BASE}/categories`);
    setCategories(res.data);
  } catch (err) {
    console.error("Erro ao carregar categorias:", err);
  }
};

// useEffect chama a função quando a página carregar
  useEffect(() => {
    handleGetCategories();
  }, []);

  const handleAddNewCategory = async () => {
    if (newCategory && !categories.includes(newCategory)) {
        try {
      const res = await axios.post(`${URL_BASE}/categories`, {
        name: newCategory,
      });
      // adiciona localmente
      setCategories([...categories, newCategory]);
      setCategory(res.data.name); // seleciona a nova categoria
      setNewCategory("");
      setIsNew(false);
       // recarrega do backend
      await handleGetCategories();
      alert("Categoria adicionada com sucesso!");
    }
    catch (err) {
      console.error("Erro ao adicionar categoria:", err);
    }
  };
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      alert(`Categoria selecionada: ${category}`);
    } else {
      alert("Nenhuma imagem selecionada");
    }

  try {

    const formData = new FormData();
    formData.append("image", image);       // Nome do campo esperado no back-end
    formData.append("category", category);   // Categoria selecionada
const response = await axios.post(`${URL_BASE}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Upload feito com sucesso!");
    console.log(response.data);
  }
   catch (error) {
    console.error("Erro ao enviar:", error.response?.data || error.message);
    alert("Erro ao enviar o arquivo.");
  }
};

// localStorage.clear();

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded space-y-4 mt-10">
      <label htmlFor="category" className="block font-bold mb-1">Categoria:</label>

      {/* Select com categorias existentes */}
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded cursor-pointer"
        required
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>{cat.name}</option>
        ))}
      </select>

      {/* Checkbox para criar nova categoria */}
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          id="newCategoryCheckbox"
          checked={isNew}
          onChange={() => setIsNew(!isNew)}
          className="cursor-pointer"
        />
        <label htmlFor="newCategoryCheckbox">Nova categoria</label>
      </div>

      {/* Input e botão aparecem quando checkbox marcado */}
      {isNew && (
        <div className="flex space-x-2 mt-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Digite nova categoria"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={handleAddNewCategory}
            className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-700 transition cursor-pointer"
          >
            Adicionar
          </button>
        </div>
      )}

            <input
        type="file"
        id="image"
        accept="image/*" 
        onChange={(e) => setImage(e.target.files[0])} 
        className="w-full p-2 border rounded"
      />


      <button
        type="submit"
        className="w-full bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-700 transition cursor-pointer"
      >
        Enviar
      </button>
    </form>
  );
}
