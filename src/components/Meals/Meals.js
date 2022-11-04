import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import classes from "./Meals.module.css";

const Meals = (props) => {
  return (
    <section className={classes.mealsContainer}>
      <MealsSummary />
      <AvailableMeals />
    </section>
  );
};

export default Meals;
