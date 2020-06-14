import { lists } from "~/utilities/types/lists.js";
export default ({ store, params }) =>
  store.dispatch(LISTS.actions.FETCH, params.type);
