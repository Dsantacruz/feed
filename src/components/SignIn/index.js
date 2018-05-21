import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { Form as form, FormGroup, Label, Input, FormFeedback, FormText, Container, Row, Col, Button, ButtonGroup } from 'reactstrap';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const SignInPage = ({ history }) =>
<Container>
  <Row>
    <Col sm="12" md={{ size: 8, offset: 2 }}>
      <h1 className="text-center">Loguéate</h1>
      <SignInForm history={history} />
      <PasswordForgetLink />
      <SignUpLink />
    </Col>
  </Row>
</Container>

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
            <FormGroup>
              <Field name="username">
                {({ input, meta }) => (
                  <div>
                    <Label for="exampleEmail">Usuario</Label>
                    <Input {...input} type="text" placeholder="Username" />
                    {(meta.error || meta.submitError) &&
                    meta.touched && <small className="text-danger">{meta.error || meta.submitError}</small>}
                  </div>
                )}
              </Field>
            </FormGroup>
            <FormGroup>
              <Field name="password">
                {({ input, meta }) => (
                  <div>
                    <label>Password</label>
                    <Input {...input} type="password" placeholder="Password" />
                    {meta.error && meta.touched && <small className="text-danger">{meta.error}</small>}
                  </div>
                )}
              </Field>
            </FormGroup>
            {submitError && <small className="text-danger">{submitError}</small>}
            <br/>
            <ButtonGroup>
              <Button color="info" type="submit" disabled={submitting}>Logueate</Button>{' '}
              <Button 
                color="secondary"
                type="button"
                onClick={reset}
                disabled={submitting || pristine}
                style={{ marginLeft : '10px' }}
              >
                Reset
              </Button>{' '}
            </ButtonGroup>
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      />
    )
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};