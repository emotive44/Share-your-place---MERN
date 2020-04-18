import React from 'react';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/FormElements/Button';
import Input from '../../shared/FormElements/Input';
import Card from '../../shared/UIElements/Card';
import './Auth.css';

const Auth = () => {
  const [formState, inputHandler] = useForm({}, false);

  const authSubmitHandler = e => {
    e.preventDefault();
    console.log(formState.inputs);
  }

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr/>
      <form onSubmit={authSubmitHandler}>
        <Input 
          id="email"
          type="email"
          label="Email"
          element="input"
          onInput={inputHandler}
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
        />
        <Input 
          id="password"
          type="password"
          element="input"
          label="Password"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 character"
        />
        <Button type="submit" disabled={!formState.isValid} >
          Login
        </Button>
      </form>
    </Card>
  );
}

export default Auth;
