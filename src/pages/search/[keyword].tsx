import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Input, Button, useToast } from '@chakra-ui/react';
import { useAuthContext } from '@contexts'
import Cookies from 'js-cookie'

interface App {
  id: number;
  name: string;
  userId: number | null;
  imageUrl: string;
  description: string;
  installerUrl: string;
  version: string;
  price: number;
}

const SearchResults = () => {
  const router = useRouter();
  const { keyword } = router.query;
  const { user , isAuthenticated} = useAuthContext();
  const [results, setResults] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated === false) {
      toast({
        title: 'Anda harus login terlebih dahulu!',
        status: 'error',
        position: 'top',
        duration: 4000,
        isClosable: true,
      });
      router.push('/login');
    } else if (user?.role !== 'USER' && user?.role !== undefined) {
      toast({
        title: 'Anda tidak memiliki akses ke halaman ini!',
        status: 'error',
        position: 'top',
        duration: 4000,
        isClosable: true,
      });
    }
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

    if (keyword && isAuthenticated && user?.role === 'USER') { // Check if keyword is present and user is authenticated
      fetchSearchResults();
    }
    console.log(isAuthenticated, user?.role)
  }, [keyword, isAuthenticated, user?.role]);

  const handleClickApp = (appId: number) => {
    router.push(`/app/${appId}`);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-md mx-auto px-4">
        {user?.role !== 'USER' && user?.role !== undefined ? (
          <p className="text-red-500 text-center text-lg font-medium">
            You do not have access to view search results.
          </p>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-8 text-white">
              Search Results for: {keyword}
            </h1>
            <ul className="space-y-4">
              {results.map((app) => (
                <li key={app.id} className="bg-white p-4 rounded-md shadow-md">
                  {/* Rest of the code */}
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
          </>
        )}
      </div>
    </div>
  );
  
};

export default SearchResults;
