import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";

const SignInPage = ({ history }) =>
  <div>
    <h1>Loguéate</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class SignInForm extends Component
{
  constructor(props)
  {
    super(props);
  }

  onSubmit = async values => {
    await sleep(300);

    let username = values.username;

    let password = values.password;
  
    const {
      history,
    } = this.props;
  
    console.log("history");
    console.log(this.props);

    return auth.doSignInWithEmailAndPassword(username, password)
      .then(() => {   
        history.push(routes.HOME);
      })
      .catch(error => {
        let errorCode = error.code;

        let errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') 
        {
          return { [FORM_ERROR] : 'Password incorrecto, intente nuevamente.' }
        }

        if(errorCode === 'auth/invalid-email')
        {
          return { username: 'Email inválido, intente nuevamente.' }
        }

        if(errorCode === 'auth/user-not-found')
        {
          return { username : 'Usuario no encontrado, intente nuevamente.' }
        }
      });
  };

  render()
  {
    return(
      <Form
        onSubmit={this.onSubmit}
        validate={values => {
          const errors = {};
          if (! values.username) {
            errors.username = "Requerido";
          }
          if (! values.password) {
            errors.password = "Requerido";
          }
          return errors;
        }}
        render={({
          submitError,
          handleSubmit,
          reset,
          submitting,
          pristine,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Field name="username">
              {({ input, meta }) => (
                <div>
                  <label>Username</label>
                  <input {...input} type="text" placeholder="Username" />
                  {(meta.error || meta.submitError) &&
                  meta.touched && <span>{meta.error || meta.submitError}</span>}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <label>Password</label>
                  <input {...input} type="password" placeholder="Password" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            {submitError && <div className="error">{submitError}</div>}
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Log In
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    )
  }
}

console.log("antes de signInForm");

export default withRouter(SignInPage);

export {
  SignInForm,
};