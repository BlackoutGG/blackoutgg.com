// import { LISTS } from "~/utilities/types.js";
import types from "~/utilities/types/users.js";
export default ({ store }) => {
  store.dispatch(types.actions.FETCH);
};
