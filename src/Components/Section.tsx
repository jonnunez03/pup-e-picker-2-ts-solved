import { ReactNode, useContext } from "react";
import { DogContext } from "../Context/DogContextProvider";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const { activeTab, onClickHandler, counters } = useContext(DogContext);

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "fav" ? "active" : ""}`}
            onClick={() => onClickHandler("fav")}
          >
            favorited ( {counters.favDogs} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab === "unFav" ? "active" : ""}`}
            onClick={() => onClickHandler("unFav")}
          >
            unfavorited ( {counters.unFavDogs} )
          </div>
          <div
            className={`selector ${activeTab === "createDog" ? "active" : ""}`}
            onClick={() => onClickHandler("createDog")}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
