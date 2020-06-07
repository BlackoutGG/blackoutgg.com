import { LISTS, SNACKBAR } from "~/utilities/types.js";
import removeNamespace from "~/utilities/removeNamespace.js";

const Types = removeNamespace("lists/", LISTS);

const state = () => ({
  items: {
    users: [],
    roles: [],
    posts: []
  },
  listType: "",
  selected: [],

  queryParams: {
    page: 1,
    limit: 20,
    total: 0,
    orderBy: "DESC",
    sortBy: "id"
  }
});

const getters = {
  [Types.getters.ITEMS]: state => type => state.items[type],
  [Types.getters.LIST_TYPE]: state => state.listType,
  [Types.getters.SELECTED]: state => state.selected,
  [Types.getters.QUERY_PARAMS]: state => key =>
    typeof key !== undefined ? state.queryParams[key] : state.queryParams
};

const mutations = {
  [Types.mutations.SET_LIST](state, payload) {
    state.items[state.listType] = payload;
  },
  [Types.mutations.SET_TYPE](state, type) {
    state.listType = type;
  },
  [Types.mutations.SET_SELECTED](state, selected) {
    const idx = state.selected.indexOf(selected);
    if (idx !== -1) state.selected.splice(idx, 1);
    else state.selected.push(selected);
  },
  [Types.mutations.SET_PAGE](state, page) {
    state.queryParams.page = page;
  },
  [Types.mutations.SET_SORT](state, sortBy) {
    state.queryParams.sortByh = sortBy;
  },
  [Types.mutations.SET_TOTAL](state, total) {
    state.queryParams.total = total;
  },
  [Types.mutations.REMOVE_ROLE](state, { userId, role }) {
    const user = state.lists.users.find(id => id === userId);
    if (user) user.roles.splice(user.roles.indexOf(role), 1);
  }
};

const actions = {
  async [Types.actions.FETCH]({ commit, dispatch, state }, type) {
    commit(Types.mutations.SET_TYPE, type);
    try {
      const { data } = await this.$axios.get(`/api/${state.listType}`, {
        params: { ...state.queryParams }
      });
      commit(Types.mutations.SET_LIST, data[`${state.listType}`].results);
      commit(Types.mutations.SET_TOTAL, data[`${state.listType}`].total);
      dispatch(
        SNACKBAR.actions.TOGGLE_BAR,
        {
          text: "Content Loaded.",
          color: "#000"
        },
        { root: true }
      );
    } catch (err) {
      dispatch(
        SNACKBAR.actions.TOGGLE_BAR,
        {
          text: err.message,
          color: "#000"
        },
        { root: true }
      );
      console.log(err);
    }
  }
};

export default { state, getters, mutations, actions };
