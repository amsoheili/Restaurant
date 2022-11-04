import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

//const DUMMY_MEALS = [];

// const getData = async () => {
//   const response = await fetch(
//     "https://react-b1f38-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json"
//   );
//   console.log("f");
//   const data = await response.json();

//   for (const id in data) {
//     DUMMY_MEALS.push({
//       id: id,
//       name: data[id].name,
//       description: data[id].description,
//       price: data[id].price,
//     });
//   }
// };

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

// getData();

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      const response = await fetch(
        "https://react-b1f38-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json"
      );
      console.log("f");
      if (!response.ok) {
        throw new Error("Response has an error");
      }
      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setIsLoading(false);
      setMeals(loadedMeals);
    }

    getData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));

  return (
    <section className={classes.mealsList}>
      <Card>
        <div className={classes.loadingMeals}>
          {isLoading && <p>Loading...</p>}
          {httpError && <p>Something went wrong (vpn should be used)</p>}
        </div>
        <ul>{!httpError && mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
