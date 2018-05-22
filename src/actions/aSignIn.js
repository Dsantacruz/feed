import actions from './constants/signIn';

const {
    USER_SET,
} = actions;

// export const addUser = (
// user
// ) => ({
//     type: ADD_USER,
//     user
// });

export const userSet = (users) => ({
    type: USER_SET,
    users
});