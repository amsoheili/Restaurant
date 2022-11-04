import { useRef, useState } from "react";
import classes from "./Checkout.module.css";
import useCheckout from "../../hooks/Checkout-input";

const isEmpty = (value) => {
  return value.trim() === "";
};

const isFiveChar = (value) => {
  return value.trim().length === 5;
};
//   const {
//     value: name,
//     isValid: nameIsValid,
//     hasError: nameInputHasError,
//     valueChangeHandler: nameChangeHandler,
//     inputBlurHandler: nameInputBlurHandler,
//     reset: nameReset,
//   } = useCheckout((value) => value.trim() !== 0);

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChar(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes["checkout-form"]}>
        <div
          className={`${classes.control} ${
            formInputsValidity.name ? "" : classes.invalid
          }`}
        >
          <label htmlFor="name">Your Name</label>
          <input type="text" name="name" ref={nameInputRef} />
          {!formInputsValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div
          className={`${classes.control} ${
            formInputsValidity.street ? "" : classes.invalid
          }`}
        >
          <label htmlFor="street">Street</label>
          <input type="text" name="street" ref={streetInputRef} />
          {!formInputsValidity.street && <p>Please enter a valid street!</p>}
        </div>
        <div
          className={`${classes.control} ${
            formInputsValidity.postalCode ? "" : classes.invalid
          }`}
        >
          <label htmlFor="postal">Postal</label>
          <input type="text" name="postal" ref={postalCodeInputRef} />
          {!formInputsValidity.postalCode && (
            <p>Please enter a valid postal code(5 characters long)!</p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            formInputsValidity.city ? "" : classes.invalid
          }`}
        >
          <label htmlFor="city">City</label>
          <input type="text" name="city" ref={cityInputRef} />
          {!formInputsValidity.city && <p>Please enter a valid city!</p>}
        </div>
        <div className={classes["checkout-actions"]}>
          <button type="button" onClick={props.onClose}>
            Close
          </button>
          <button type="submit">Confirm</button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
