import removeNamespace from "../removeNamespace";

export const forms = {
  getters: {
    QUESTIONS: "forms/questions",
    DESCRIPTION: "forms/description",
    CATEGORY: "forms/category",
    GET_OPTION: "forms/getOption"
  },
  mutations: {
    ADD_QUESTION: "forms/addQuestion",
    ADD_OPTION: "forms/addOption",
    CLEAR_OPTIONS: "forms/clearOptions",
    CHANGE_QUESTION_VALUE: "forms/changeQuestionValue",
    CHANGE_QUESTION_TYPE: "forms/changeQuestionType",
    CHANGE_OPTION_VALUE: "forms/changeOptionValue",
    TOGGLE_OPTIONAL: "forms/toggleOptional",
    REMOVE_QUESTION: "forms/removeQuestion",
    REMOVE_OPTION: "forms/removeOption",
    SET_DESCRIPTION: "forms/setDescription",
    SET_CATEGORY: "forms/setCategory"
  }
};

export const _forms = removeNamespace("forms/", forms);
