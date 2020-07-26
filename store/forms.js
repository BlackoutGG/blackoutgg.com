import { _forms as forms } from "~/utilities/ns/forms.js";
// const getQuestions = state => id => state.questions.find(q => q.id === id);
// const getById = getQuestions(state);

const state = () => ({
  questions: [],
  description: ""
});

const getters = {
  [forms.getters.QUESTIONS]: state => state.questions,
  [forms.getters.DESCRIPTION]: state => state.description
};

const mutations = {
  [forms.mutations.ADD_QUESTION](state) {
    state.questions.push({
      value: "",
      type: "textfield",
      optional: true,
      options: []
    });
  },
  [forms.mutations.ADD_OPTION](state, idx) {
    const q = state.questions[idx];
    if (q) q.options.push({ value: "" });
  },
  [forms.mutations.CLEAR_OPTIONS](state, idx) {
    const q = state.questions[idx];
    if (q) q.options = [];
  },
  [forms.mutations.CHANGE_QUESTION_VALUE](state, { idx, value }) {
    // const q = state.questions.find((qs => qs.id === id);
    // if (q) q.value = value;
    const q = state.questions[idx];
    if (q) q.value = value;
  },
  [forms.mutations.CHANGE_OPTION_VALUE](state, { question, option, value }) {
    const q = state.questions[question];
    if (q) {
      const o = q.options[option];
      if (o) o.value = value;
    }
  },
  [forms.mutations.CHANGE_QUESTION_TYPE](state, { idx, type }) {
    const q = state.questions[idx];
    if (q) q.type = type;
  },
  [forms.mutations.TOGGLE_OPTIONAL](state, { idx, bool }) {
    // const q = getById(id);
    // if (q) q.optional = !q.optional;
    const q = state.questions[idx];
    q.optional = bool;
  },
  [forms.mutations.REMOVE_QUESTION](state, idx) {
    state.questions.splice(idx, 1);
  },
  [forms.mutations.REMOVE_OPTION](state, { question, option }) {
    const q = state.questions[question];
    if (q && q.options && q.options.length) {
      q.options.splice(option, 1);
    }
  }
};

export default { state, getters, mutations };
