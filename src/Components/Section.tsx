import { ReactNode, useContext } from "react";
import { DogContext } from "../Context/DogContextProvider";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const { activeTab, onClickHandler, dogs } = useContext(DogContext);

  const favoritedCount = dogs.filter((dog) => dog.isFavorite).length;
  const unfavoritedCount = dogs.filter((dog) => !dog.isFavorite).length;
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              activeTab === "selectedFav" ? "active" : ""
            }`}
            onClick={() => onClickHandler(true, false)}
          >
            favorited ( {favoritedCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeTab === "selectedUnFav" ? "active" : ""
            }`}
            onClick={() => onClickHandler(false, false)}
          >
            unfavorited ( {unfavoritedCount} )
          </div>
          <div
            className={`selector ${
              activeTab === "selectedCreateDog" ? "active" : ""
            }`}
            onClick={() => onClickHandler(true, true)}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
