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
    return state.questions
      .map((qs, idx) => {
        const { isNew, options, ...field } = qs;
        const validOptions =
          options && options.length
            ? filter(options, "value").map(o => {
                const { isNew, ...options } = o;
                return options;
              })
            : [];
        return {
          ...field,
          options: validOptions
        };
      })
      .filter(qs => !!qs.value);
  },

  [ns.getters.DESCRIPTION]: state => state.description,

  [ns.getters.SELECTED]: state => state.selected,

  [ns.getters.FORMS]: state => state.forms,

  [ns.getters.CATEGORY]: state => state.category_id
};

const mutations = {
  [ns.mutations.ADD_QUESTION](state) {
    state.questions.push({
      value: "",
      type: "textfield",
      optional: true,
      options: [],
      isNew: true
    });
  },
  [ns.mutations.ADD_OPTION](state, idx) {
    const q = state.questions[idx];
    if (q) q.options.push({ value: "", isNew: true });
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
    state.forms = state.forms
      .filter(form => form.category_id === category_id)
      .map(form => {
        if (form.id !== id) form.status = false;
        else form.status = status;
        return form;
      });
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
  },
  [ns.mutations.SET_FIELDS](state, fields) {
    state.questions = fields;
  },
  [ns.mutations.SET_OPTIONS](state, idx) {
    const q = state.questions[idx];
    if (q && !q.options) q.options = [];
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

      console.log(forms);

      commit(
        lists.mutations.SET_LIST,
        {
          type: "categories",
          list: categories
        },
        { root: true }
      );
      commit(ns.mutations.SET_FORMS, forms.results);
      commit(ns.mutations.SET_PARAM, { param: "total", value: forms.total });
    } catch (err) {
      console.log(err);
    }
  },

  async [ns.actions.SET_STATUS]({ commit }, { id, category_id }) {
    try {
      const {
        data: { form }
      } = await this.$axios.put(`/api/forms/status/${id}`, {
        category_id
      });

      console.log(form);

      commit(ns.mutations.SET_FORM_STATUS, form);
    } catch (err) {
      console.log(err);
    }
  },

  async [ns.actions.GET_FORM]({ commit }, params) {
    try {
      const {
        data: { form }
      } = await this.$axios.get(`/api/forms/single`, { params });

      commit(ns.mutations.SET_NAME, form.name);
      commit(ns.mutations.SET_DESCRIPTION, form.description);
      commit(ns.mutations.SET_CATEGORY, form.category.id);
      commit(ns.mutations.SET_FIELDS, form.fields);

      return form;
    } catch (err) {
      console.log(err);
    }
  },

  async [ns.actions.CLEAR_FORM]({ commit }) {
    commit(ns.mutations.SET_NAME, "");
    commit(ns.mutations.SET_DESCRIPTION, "");
    commit(ns.mutations.SET_CATEGORY, 1);
    commit(ns.mutations.SET_FIELDS, []);
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
  },

  async [ns.actions.EDIT_FORM]({ commit }, { id, payload }) {
    try {
      const {
        data: { form }
      } = await this.$axios.put(`/${id}`, payload);
    } catch (err) {}
  }
};

export default { state, getters, mutations, actions };
