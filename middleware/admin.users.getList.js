import { users } from "~/utilities/types/users.js";
export default ({ store }) => {
  store.dispatch(users.actions.FETCH);
};
