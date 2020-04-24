import React, { useState, useContext, Fragment } from 'react';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/FormElements/Button';
import Input from '../../shared/FormElements/Input';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import Card from '../../shared/UIElements/Card';
import './Auth.css';
import { useHistory } from 'react-router-dom'

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, inputHandler, setFormData] = useForm({}, false);
  const value = useContext(AuthContext);
  const history = useHistory();

  const authSubmitHandler = async e => {
    e.preventDefault();
    const { name, email, password } = formState.inputs;
    
    setIsLoading(true);
    if(isLoginMode) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          })
        });
        const responseData = await response.json();

        if(!response.ok) {
          throw new Error(responseData.message);
        }

        history.push('/') // After login or register user will be redirec to home page
        value.login();
        setIsLoading(false);
      } catch(err) {
        setIsLoading(false);
        setError(err.message || 'Something went wrong, please try again!');
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
          })
        });
        const responseData = await response.json();
        console.log(responseData);

        if(!response.ok) {
          throw new Error(responseData.message);
        }

        history.push('/') // After login or register user will be redirec to home page
        value.login();
        setIsLoading(false);
      } catch(err) {
        setIsLoading(false);
        setError(err.message || 'Something went wrong, please try again!');
      }
    }
    setIsLoading(false);
  }

  const switchModeHandler = () => { 
    if(!isLoginMode) {
      console.log(formState.inputs)
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData({
        ...formState.inputs,
        name: { value: '', isValid: false }
      }, false);
    }
    setIsLoginMode(prevMode => !prevMode);
  }

  const errorHandler = () => {
    setError(null);
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={errorHandler}/>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login Required</h2>
        <hr/>
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input  
              id="name"
              type="text"
              element="input"
              label="Your Name"
              onInput={inputHandler}
              errorText="Please enter a name"
              validators={[VALIDATOR_REQUIRE()]}
            />
          )}
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
            {isLoginMode ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLoginMode ? 'Sign Up' : 'Login'}
        </Button>
      </Card>
    </Fragment>
  );
}

export default Auth;
