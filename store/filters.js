import ns from "~/utilities/ns/private/filters.js";

const state = () => ({
  users: {
    "roles.id": []
  },

  forms: {
    category_id: [],
    status: false
  }
});

const getters = {
  [ns.getters.GET_FILTER]: state => filter => state[filter]
};

const mutations = {
  [ns.mutations.SET_FILTER](state, { name, type, value }) {
    console.log(name, type, value);
    const filter = state[name];
    filter[type] = value;
  },
  [ns.mutations.RESET_FILTER](state, name) {
    const filter = state[name];
    Object.keys(filter).forEach(key => {
      let result;
      if (Array.isArray(filter[key])) result = [];
      if (typeof filter[key] === "boolean") result = false;
      filter[key] = result;
    });
  },
  [ns.mutations.CLEAR_FILTERS](state) {
    Object.keys(state).forEach(key =>
      Object.values(state[key]).forEach(v => (v = []))
    );
  }
};

export default { state, getters, mutations };
