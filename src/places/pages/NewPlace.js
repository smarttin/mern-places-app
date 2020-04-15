import React, { useCallback, useReducer } from "react";

import "./NewPlace.css";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";


const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
         if (inputId === state.inputs) {
           formIsValid = formIsValid && action.isValid;
         } else {
           formIsValid = formIsValid && state.inputs[inputId].isValid
         }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {value: action.value, isValid: action.isValid}
        },
        isValid: formIsValid
      }
    default:
      return state;
  }
}

const initialState = {
  inputs: {
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  },
  isValid: false
}

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState)

  const InputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    })
  }, []);

  const submitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  return (
    <form className="place-form" onSubmit={submitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={InputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={InputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={InputHandler}
      />
      <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
  );
};

export default NewPlace;
