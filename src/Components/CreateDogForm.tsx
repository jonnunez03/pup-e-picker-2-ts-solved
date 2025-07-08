import { FormEvent, useContext, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { DogContext } from "../Context/DogContextProvider";

const defaultSelectedImage = dogPictures.BlueHeeler;

export const CreateDogForm = () => {
  const [image, setImage] = useState(defaultSelectedImage);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { handlePostRequest, isLoading } = useContext(DogContext);

  const resetForm = () => {
    setName("");
    setDescription("");
    setImage(defaultSelectedImage);
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await handlePostRequest({ name, image, description });
    if (success) resetForm();
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleOnSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        value={image}
        id=""
        onChange={(e) => setImage(e.target.value)}
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" value="submit" disabled={isLoading} />
    </form>
  );
};
