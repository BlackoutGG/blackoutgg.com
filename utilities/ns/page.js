import removeNamespace from "../removeNamespace";

export const page = {
  getters: {
    TITLE: "page/title",
    MOBILE: "page/mobile",
    ACPANEL: "page/acPanel"
  },
  mutations: {
    SET_TITLE: "page/SET_TITLE",
    SET_MOBILE: "page/SET_MOBILE",
    TOGGLE_ACPANEL: "page/TOGGLE_ACPANEL"
  }
};

export const _page = removeNamespace("page/", page);
