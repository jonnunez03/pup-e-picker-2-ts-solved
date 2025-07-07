import { useContext } from "react";
import { Section } from "./Components/Section";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { DogContext } from "./Context/DogContextProvider";

export function App() {
  const { activeTab } = useContext(DogContext);
  const activeSection =
    activeTab === "selectedCreateDog" ? <CreateDogForm /> : <Dogs />;

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>{activeSection}</Section>
    </div>
  );
}
