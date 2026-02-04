import { jokes } from "@/data/jokes";
import { useEffect, useState } from "react";

const RandomJoke = () => {
  const [joke, setJoke] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      if (jokes[randomIndex] === joke) {
        // Ensure a different joke is fetched
        return fetchJoke();
      }
      setJoke(jokes[randomIndex]);
    } catch (error) {
      setJoke('Failed to fetch joke.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="p-2 font-doto text-xs rounded-lg bg-accent hover:bg-accent-hover transition-colors cursor-pointer whitespace-pre-line" onClick={fetchJoke} seed="Click to get a new joke">
      {loading ? 'Loading...' : joke || 'Click for a joke!'}
    </div>
  );
}

export default RandomJoke;