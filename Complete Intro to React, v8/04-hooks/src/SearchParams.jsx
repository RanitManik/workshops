import { useState } from "react";

const SearchParams = () => {
  const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
  const BREEDS = [];
  const [animal, setAnimal] = useState("");
  const [location, setLocation] = useState("");
  const [breed, setBreed] = useState("");

  return (
    <div className="search-params">
      <form action="">
        <label htmlFor="location">location</label>
        <input
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          id="location"
          placeholder="location"
          type="text"
        />
        <label htmlFor="animal">Animal</label>
        <select
          name="animal"
          id="animal"
          disabled={ANIMALS.length === 0}
          value={animal}
          onChange={(e) => {
            setAnimal(e.target.value);
            setBreed("");
          }}
        >
          {ANIMALS.map((animal) => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </select>
        <label htmlFor="breed">Breed</label>
        <select
          name="breed"
          id="breed"
          disabled={BREEDS.length === 0}
          value={breed}
          onChange={(e) => {
            setBreed(e.target.value);
          }}
        >
          {BREEDS.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
