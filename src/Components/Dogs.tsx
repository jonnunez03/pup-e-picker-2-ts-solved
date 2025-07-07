// Right now these dogs are constant, but in reality we should be getting these from our server

import { ActiveDogCards } from "../Components/ActiveDogCards";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)

export const Dogs = () => {
  return (
    <>
      <ActiveDogCards />
    </>
  );
};
