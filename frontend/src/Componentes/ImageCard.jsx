import React from "react";

export default function ImageCard({ image }) {
  if (!image?.path) {
    return (
      <div className="w-full h-40 flex items-center justify-center bg-gray-200">
        Carregando...
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:scale-105 transition">
      <img
        src={image.path} // já é o link público do Cloudinary
        alt={image.name || "Imagem"}
        className="w-full h-40 object-cover"
      />
    </div>
  );
}
