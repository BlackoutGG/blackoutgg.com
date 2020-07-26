import removeNamespace from "../removeNamespace";

export const dialogs = {
  getters: {
    SHOW: "dialog/openDialog"
  },
  mutations: {
    TOGGLE: "dialog/toggleDialog"
  }
};

export const _dialogs = removeNamespace("dialogs/", dialogs);
