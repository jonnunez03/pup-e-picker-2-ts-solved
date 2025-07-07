import { useContext, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { DogContext } from "../Context/DogContextProvider";
import { Dog } from "../types";

export const CreateDogForm = () => {
  const [image, setImage] = useState(dogPictures.BlueHeeler);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { handlePostRequest, dogs } = useContext(DogContext);

  const newDog: Dog = {
    name,
    image,
    description,
    isFavorite: false,
    id: Math.max(0, ...dogs.map((dog: Dog) => Number(dog.id))) + 1,
  };
  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={async (e) => {
        e.preventDefault();
        await handlePostRequest(newDog);
        setName("");
        setDescription("");
        setImage(dogPictures.BlueHeeler);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select value={image} id="" onChange={(e) => setImage(e.target.value)}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" value="submit" />
    </form>
  );
};
