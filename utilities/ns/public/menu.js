export default {
  getters: {
    LINKS: "menu/links"
  },
  mutations: {
    SET_LINKS: "menu/setLinks",
    ADD_LINK: "menu/addLink",
    EDIT_LINK: "menu/editLink",
    REMOVE_LINK: "menu/removeLink"
  },
  actions: {
    FETCH: "menu/fetchLinks",
    ADD_MENU_LINK: "menu/addMenuLink",
    EDIT_MENU_LINK: "menu/editMenuLink",
    REMOVE_MENU_LINK: "menu/removeMenuLink"
  }
};
