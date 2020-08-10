import users from "~/utilities/ns/public/users.js";
export default ({ store }) => {
  store.dispatch(users.actions.FETCH);
};
