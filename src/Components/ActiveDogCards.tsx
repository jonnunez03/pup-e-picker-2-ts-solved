import { useContext } from "react";
import { DogContext } from "../Context/DogContextProvider";
import { DogCard } from "./DogCard";

export const ActiveDogCards = () => {
  const {
    dogs,
    isLoading,
    handleDeleteRequest,
    handleUpdateRequest,
    activeTab,
  } = useContext(DogContext);

  const visibleDogs =
    activeTab === "selectedFav"
      ? dogs.filter((dog) => dog.isFavorite)
      : activeTab === "selectedUnFav"
      ? dogs.filter((dog) => !dog.isFavorite)
      : dogs;

  return (
    <>
      {visibleDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => handleDeleteRequest(dog.id)}
          onHeartClick={() =>
            handleUpdateRequest(dog.id, { isFavorite: false })
          }
          onEmptyHeartClick={() =>
            handleUpdateRequest(dog.id, { isFavorite: true })
          }
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
