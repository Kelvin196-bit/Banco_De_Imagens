export default function ImageCard({ image }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:scale-105 transition">
      <img
        src={`http://localhost:3001/uploads/${image.path}`}
        alt={image.name}
        className="w-full h-40 object-cover"
      />
    </div>
  );
}
