import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Jumbotron, Button } from 'reactstrap';
import AddFeed from './addFeed';
import ContainerFeed from './containerFeed';

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';

import {
  userSet
} from '../../actions/aSignIn';

class HomePage extends Component {
  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );
  }

  render() {
    const { users, session } = this.props;

    console.log("session");
    console.log(session);

    return (
      <div>
        <h1>Feed</h1>
        <p>Bienvenido: {session.email}</p>
        <AddFeed/>
        <ContainerFeed/>

        {/* { !!users && <UserList users={users} /> } */}
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

const mapStateToProps = (state) => ({
  users: state.userState.users,
  session: state.sessionState.authUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch(userSet(users)),
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
