import ns from "~/utilities/ns/private/forms.js";
import lists from "~/utilities/ns/public/lists.js";
import snackbar from "~/utilities/ns/public/snackbar.js";
import filter from "lodash/filter";

const state = () => ({
  name: "",
  category_id: 1,
  description: "",

  questions: [],
  forms: [],
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
  [ns.getters.QUESTIONS]: state => state.questions,

  [ns.getters.QUERY_PARAMS]: state => key =>
    typeof key !== undefined ? state.queryParams[key] : state.queryParams,

  [ns.getters.VALID_FIELDS]: state => {
    const originalValues = { ...state.questions };
    return state.questions
      .map((qs, idx) => {
        const { options, ...field } = qs;
        const original = originalValues[idx].options;
        const validOptions =
          options && options.length ? filter(options, "value") : [];
        return {
          ...field,
          options: validOptions
        };
      })
      .filter((qs, idx) => !!qs.value);
  },

  [ns.getters.DESCRIPTION]: state => state.description,

  [ns.getters.SELECTED]: state => state.selected,

  [ns.getters.FORMS]: state => state.forms
};

const mutations = {
  [ns.mutations.ADD_QUESTION](state) {
    state.questions.push({
      value: "",
      type: "textfield",
      optional: true,
      options: []
    });
  },
  [ns.mutations.ADD_OPTION](state, idx) {
    const q = state.questions[idx];
    if (q) q.options.push({ value: "" });
  },
  [ns.mutations.CLEAR_OPTIONS](state, idx) {
    const q = state.questions[idx];
    if (q) q.options = [];
  },
  [ns.mutations.CHANGE_QUESTION_VALUE](state, { idx, value }) {
    // const q = state.questions.find((qs => qs.id === id);
    // if (q) q.value = value;
    const q = state.questions[idx];
    if (q) q.value = value;
  },
  [ns.mutations.CHANGE_OPTION_VALUE](state, { question, option, value }) {
    const q = state.questions[question];
    if (q) {
      const o = q.options[option];
      if (o) o.value = value;
    }
  },
  [ns.mutations.CHANGE_QUESTION_TYPE](state, { idx, type }) {
    const q = state.questions[idx];
    if (q) q.type = type;
  },
  [ns.mutations.TOGGLE_OPTIONAL](state, { idx, bool }) {
    // const q = getById(id);
    // if (q) q.optional = !q.optional;
    const q = state.questions[idx];
    q.optional = bool;
  },
  [ns.mutations.REMOVE_QUESTION](state, idx) {
    state.questions.splice(idx, 1);
  },
  [ns.mutations.REMOVE_OPTION](state, { question, option }) {
    const q = state.questions[question];
    if (q && q.options && q.options.length) {
      q.options.splice(option, 1);
    }
  },
  [ns.mutations.SET_PARAM](state, { param, value }) {
    state.queryParams[param] = value;
  },
  [ns.mutations.SET_FORM_STATUS](state, { id, category_id, status }) {
    const forms = state.forms.filter(form => form.category_id === category_id);
    forms.forEach(form => {
      if (form.id !== id) form.status = false;
    });
    const form = forms.find(f => f.id === id);
    if (form) form.status = status;
  },
  [ns.mutations.SET_DESCRIPTION](state, description) {
    state.description = description;
  },
  [ns.mutations.SET_NAME](state, name) {
    state.name = name;
  },
  [ns.mutations.SET_CATEGORY](state, category) {
    state.category_id = category;
  },
  [ns.mutations.SET_FORMS](state, forms) {
    state.forms = forms;
  }
};

const actions = {
  async [ns.actions.FETCH]({ commit, state }) {
    try {
      const {
        data: { forms, categories }
      } = await this.$axios.get("/api/forms", {
        params: { ...state.queryParams }
      });

      commit(lists.mutations.SET_LIST, {
        type: "categories",
        list: categories
      });
      commit(ns.mutations.SET_FORMS, forms.results);
      commit(ns.mutations.SET_PARAM, { param: "total", value: forms.total });
    } catch (err) {
      console.log(err);
    }
  },

  async [ns.actions.SET_EDITABLE_FORM]({ commit }, id) {},

  async [ns.actions.SET_STATUS]({ commit }, { id, category_id, status }) {
    try {
      const {
        data: { form }
      } = await this.$axios.put("/api/forms/status", {
        id,
        category_id,
        status
      });

      commit(ns.mutations.SET_FORM_STATUS, form);
    } catch (err) {
      console.log(err);
    }
  },

  async [ns.actions.ADD_FORM]({ commit, state, getters }) {
    const params = {
      form: {
        name: state.name,
        description: state.description,
        category_id: state.category_id
      },
      fields: getters[ns.getters.VALID_FIELDS],
      ...state.queryParams
    };
    try {
      const {
        data: { forms }
      } = await this.$axios.post("/api/forms/template", params);

      commit(ns.mutations.SET_FORMS, forms.results);
      commit(ns.mutations.SET_PARAM, { param: "total", value: forms.total });
    } catch (err) {
      console.log(err);
    }
  }
};

export default { state, getters, mutations, actions };
