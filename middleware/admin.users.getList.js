import { users } from "~/utilities/ns/users.js";
export default ({ store }) => {
  store.dispatch(users.actions.FETCH);
};
