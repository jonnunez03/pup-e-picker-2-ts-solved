import { useContext } from "react";
import { Section } from "./Components/Section";

import { DogContext } from "./Context/DogContextProvider";
import { Dogs } from "./Components/Dogs";
import { CreateDogForm } from "./Components/CreateDogForm";

export function App() {
  const { activeTab } = useContext(DogContext);
  const isCreateDogFormView = activeTab === "createDog";

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        <>
          {!isCreateDogFormView && <Dogs />}
          {isCreateDogFormView && <CreateDogForm />}
        </>
      </Section>
    </div>
  );
}
