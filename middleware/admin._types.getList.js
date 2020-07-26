import { lists } from "~/utilities/ns/lists.js";
export default ({ store, params }) =>
  store.dispatch(LISTS.actions.FETCH, params.type);
