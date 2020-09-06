import ns from "~/utilities/ns/private/lists.js";
import snackbar from "~/utilities/ns/public/snackbar.js";

const state = () => ({
  items: {
    categories: [],
    userApplications: []
  },

  selected: [],

  queryParams: {
    page: 1,
    limit: 25,
    total: 0,
    orderBy: "DESC",
    sortBy: "id"
  }
});

const getters = {
  [ns.getters.ITEMS]: state => type => state.items[type],
  [ns.getters.SELECTED]: state => state.selected,
  [ns.getters.SELECTED_IDS]: state => state.selected.map(({ id }) => id),
  [ns.getters.QUERY_PARAMS]: state => key =>
    typeof key !== undefined ? state.queryParams[key] : state.queryParams
};

const mutations = {
  [ns.mutations.SET_LIST](state, { type, list }) {
    state.items[type] = list;
  },
  [ns.mutations.SET_SELECTED](state, selected) {
    state.selected = selected;
  },
  [ns.mutations.SET_PARAM](state, { param, value }) {
    state.queryParams[param] = value;
  }
};

const actions = {
  async [ns.actions.FETCH]({ commit, state }, type) {
    try {
      const { data } = await this.$axios.get(`/api/${type}`, {
        params: { ...state.queryParams }
      });

      commit(ns.mutations.SET_LIST, { type, list: data[type].results });
      commit(ns.mutations.SET_PARAM, {
        param: "total",
        value: data[type].total
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export default { state, getters, mutations, actions };
