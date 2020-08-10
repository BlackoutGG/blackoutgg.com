import lists from "~/utilities/ns/public/lists.js";
export default ({ store, params }) =>
  store.dispatch(lists.actions.FETCH, params.type);
