import { useEffect, useState } from "react";
interface Post {
  userId: number, 
  id: number, 
  title:string
}
const Post = () => {
  const [data, setData] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const consumirApi = async () => {
    setError(null)
    setLoading("Cargando...");
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const posts = await response.json() as Post[];
      if (Array.isArray(posts)) {
        setData(posts);
      } else {
        setError("La respuesta no es un array de posts");
      }
      console.log(posts);
    } catch (e) {
      console.error(e);
      setError("Error al consumir la API");
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    consumirApi()
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl py-3 font-bold">PLACEHOLDER</h1>
      
      {loading && (<p className="text-green-500 text-lg py-8 text-center">{loading}</p>)}

      <p className="text-red-600 text-center">
      {error && (error)}</p>
      <div className="flex justify-center items-center w-full">
        <div className="w-md ">
        { data && 
        
        (
          data.map( (post) => 
            <div key={post.id} className="flex gap-2">
              <span>{post.id}</span>
              <span >{post.title}</span>
            </div>
          )
        )
        }
        </div>

      </div>
    </div>
  );
};

export default Post;
