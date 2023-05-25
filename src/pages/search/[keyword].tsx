import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Input, Button, useToast } from '@chakra-ui/react';

interface App {
  id: number;
  name: string;
  userId: number | null;
  imageUrl: string;
  description: string;
  version: string;
  price: number;
}

const SearchResults = () => {
  const router = useRouter();
  const { keyword } = router.query;

  const [results, setResults] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://34.87.155.107/search/${keyword}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error('Failed to fetch search results:', response.status);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
      setIsLoading(false);
    };

    if (keyword) {
      fetchSearchResults();
    }
  }, [keyword]);

  const handleClickApp = (appId: number) => {
    router.push(`/app/${appId}`);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-white">
          Search Results for: {keyword}
        </h1>
        <ul className="space-y-4">
          {results.map((app) => (
            <li key={app.id} className="bg-white p-4 rounded-md shadow-md">
              <div
                className="cursor-pointer"
                onClick={() => handleClickApp(app.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{app.name}</h3>
                  <span className="text-gray-600">
                    {app.price ? `$${app.price}` : 'Free'}
                  </span>
                </div>
                <p className="text-gray-600">{app.description}</p>
              </div>
            </li>
          ))}
        </ul>
        {results.length === 0 && (
          <p className="text-gray-600 mt-4">No apps found.</p>
        )}
        <Button
          colorScheme="teal"
          variant="solid"
          isLoading={isLoading}
          onClick={() => router.back()}
          className="mt-8"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default SearchResults;
