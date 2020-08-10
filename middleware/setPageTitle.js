import page from "~/utilities/ns/public/page.js";
export default title => ({ store }) =>
  store.commit(page.mutations.SET_TITLE, title);
