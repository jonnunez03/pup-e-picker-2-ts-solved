import { createContext, ReactNode, useEffect, useState } from "react";
import { Dog, TActiveTab } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type TDogContext = {
  activeTab: string;
  handleUpdateRequest: (dogId: number, favState: Partial<Dog>) => Promise<void>;
  handleDeleteRequest: (dogId: number) => Promise<void>;
  handlePostRequest: (dogData: Partial<Dog>) => Promise<boolean>;
  onClickHandler: (value: TActiveTab) => void;
  isLoading: boolean;
  visibleDogs: Dog[];
  counters: { favDogs: number; unFavDogs: number };
};

export const DogContext = createContext<TDogContext>({} as TDogContext);

export const DogContextProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TActiveTab>("all");

  const fetchDogs = () => {
    return Requests.getAllDogs()
      .then(setDogs)
      .catch(() => {
        toast.error("Dogs fetching failed!");
      });
  };

  useEffect(() => {
    fetchDogs()
      .then(() => {
        console.log("The dogs were fetched successfully");
      })
      .catch(() => {
        console.log("The dogs fetching failed");
      });
  }, []);

  const handlePostRequest = async (dogData: Partial<Dog>): Promise<boolean> => {
    setIsLoading(true);
    setDogs((prevDogs) => {
      const optimisticData: Dog = {
        id: Date.now(),
        isFavorite: false,
        name: dogData.name || "Unknown Name",
        image: dogData.image || "default-image-url.jpg",
        description: dogData.description || "No description",
      };
      return [...prevDogs, optimisticData];
    });

    try {
      await Requests.postDog(dogData);
      toast.success("The dog was added successfully!");
      await fetchDogs();
      return true;
    } catch (error) {
      toast.error("Unable to create dog!");
      setDogs(dogs);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRequest = (
    dogId: number,
    favState: Partial<Dog>
  ): Promise<void> => {
    setIsLoading(true);
    setDogs((prevDogs) =>
      prevDogs.map((existingDog) =>
        existingDog.id === dogId ? { ...existingDog, ...favState } : existingDog
      )
    );
    return Requests.patchFavoriteForDog(dogId, favState)
      .then(() => {
        toast.success("The dog was updated successfully!");
      })
      .catch(() => {
        setDogs(dogs);
        toast.error("Dog updating failed!");
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteRequest = async (dogId: number): Promise<void> => {
    setIsLoading(true);
    setDogs((prevDog) =>
      prevDog.filter((existingDog) => existingDog.id !== dogId)
    );
    return Requests.deleteDogRequest(dogId)
      .then(() => {
        toast.success("The dog was deleted successfully!");
      })
      .catch(() => {
        setDogs(dogs);
        toast.error("Dog deleting failed!");
      })
      .finally(() => setIsLoading(false));
  };

  const onClickHandler = (value: TActiveTab) => {
    const isSameActiveTab = value === activeTab;
    const newActiveTab = isSameActiveTab ? "all" : value;
    setActiveTab(newActiveTab);
  };

  const favDogs = dogs.filter((dog) => dog.isFavorite);
  const unFavDogs = dogs.filter((dog) => !dog.isFavorite);

  const dogsList: Record<TActiveTab, Dog[]> = {
    all: dogs,
    fav: favDogs,
    unFav: unFavDogs,
    createDog: [],
  };

  const counters = {
    favDogs: favDogs.length,
    unFavDogs: unFavDogs.length,
  };

  return (
    <DogContext.Provider
      value={{
        isLoading,
        activeTab,
        handleDeleteRequest,
        handlePostRequest,
        handleUpdateRequest,
        onClickHandler,
        visibleDogs: dogsList[activeTab],
        counters,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};
