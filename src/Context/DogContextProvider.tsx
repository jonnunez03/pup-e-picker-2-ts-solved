import { createContext, ReactNode, useEffect, useState } from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import toast, { CheckmarkIcon } from "react-hot-toast";

type TDogContext = {
  dogs: Dog[];
  activeTab: string;
  handleUpdateRequest: (dogId: number, favState: Partial<Dog>) => void;
  handleDeleteRequest: (dogId: number) => void;
  handlePostRequest: (newDog: Dog) => void;
  onClickHandler: (fav: boolean, isCreateDogBtn: boolean) => void;
  isLoading: boolean;
};

export const DogContext = createContext<TDogContext>({} as TDogContext);

export const DogContextProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
    const fetchDogs = async () => {
      const currentDogs = await Requests.getAllDogs();
      setDogs(currentDogs);
    };
    fetchDogs();
  }, []);

  const handlePostRequest = async (newDog: Dog) => {
    const previousDogs = [...dogs];
    setDogs((prevDogs) => [...prevDogs, newDog]);
    try {
      await Requests.postDog(newDog);
      toast(
        <>
          <CheckmarkIcon /> Dog Created
        </>
      );
    } catch (error) {
      setDogs(previousDogs);
      toast.error("Failed to create dog");
    }
  };

  const handleUpdateRequest = async (dogId: number, favState: Partial<Dog>) => {
    setIsLoading(true);
    const previousDogs = [...dogs];
    setDogs((prevDogs) =>
      prevDogs.map((existingDog) =>
        existingDog.id === dogId ? { ...existingDog, ...favState } : existingDog
      )
    );
    try {
      await Requests.patchFavoriteForDog(dogId, favState);
    } catch (error) {
      setDogs(previousDogs);
      toast.error("Failed to update dog. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRequest = async (dogId: number) => {
    setIsLoading(true);
    const previousDogs = [...dogs];
    setDogs((prevDog) =>
      prevDog.filter((existingDog) => existingDog.id !== dogId)
    );
    try {
      await Requests.deleteDogRequest(dogId);
    } catch (error) {
      setDogs(previousDogs);
      toast.error("Failed to delete dog. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onClickHandler = (fav: boolean, isCreateDogBtn = false) => {
    let newTab = activeTab;
    if (isCreateDogBtn) {
      newTab = activeTab !== "selectedCreateDog" ? "selectedCreateDog" : "";
    } else if (fav) {
      newTab = activeTab !== "selectedFav" ? "selectedFav" : "";
    } else {
      newTab = activeTab !== "selectedUnFav" ? "selectedUnFav" : "";
    }
    setActiveTab(newTab);
    localStorage.setItem("activeTab", newTab);
  };

  return (
    <DogContext.Provider
      value={{
        dogs,
        isLoading,
        activeTab,
        handleDeleteRequest,
        handlePostRequest,
        handleUpdateRequest,
        onClickHandler,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};
