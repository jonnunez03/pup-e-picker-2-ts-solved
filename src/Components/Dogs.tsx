// Right now these dogs are constant, but in reality we should be getting these from our server

import { useContext } from "react";
import { DogContext } from "../Context/DogContextProvider";
import { DogCard } from "./DogCard";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)

export const Dogs = () => {
  const { isLoading, handleDeleteRequest, handleUpdateRequest, visibleDogs } =
    useContext(DogContext);

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
