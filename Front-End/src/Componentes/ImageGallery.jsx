import ImageCard from "./ImageCard";

export default function ImageGallery({ images }) {
  if (images.length === 0) {
    return (
      <p className="col-span-full text-center text-gray-500">
        Nenhuma imagem encontrada
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((img) => (
        <ImageCard key={img.id} image={img} />
      ))}
    </div>
  );
}
