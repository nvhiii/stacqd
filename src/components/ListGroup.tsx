// using fragment is better practice than using div
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

function ListGroup() {
  let cities = [
    `New York City`,
    `Los Angeles`,
    `Tokyo`,
    `London`,
    `Singapore`,
    `Brazil`,
    `Seoul`,
    `Dhaka`,
  ];
  // hook
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // can't do 0 bc that means the first index is selected

  // cities = [];

  // cities.map((city) => <li>{city}</li>);

  // // event handler
  // const handleClick = (e: MouseEvent) => console.log(e);

  return (
    <>
      <h1>Cities</h1>
      {/* Use ternary operator to implement if logic */}
      {cities.length === 0 && <p>No city found!</p>}
      <ul className="list-group">
        {cities.map((city, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={city}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {city}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
