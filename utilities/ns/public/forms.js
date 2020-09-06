export default {
  getters: {
    QUESTIONS: "forms/questions",
    DESCRIPTION: "forms/description",
    FILTERS: "forms/filters",
    CATEGORY: "forms/category",
    NAME: "forms/name",
    VALID_FIELDS: "forms/validFields",
    QUERY_PARAMS: "forms/queryParams",
    SELECTED: "forms/selected",
    SELECTED_IDS: "forms/selectedIds",
    FORMS: "forms/forms"
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
    SET_SELECTED: "forms/setSelected",
    SET_DESCRIPTION: "forms/setDescription",
    SET_NAME: "forms/setName",
    SET_CATEGORY: "forms/setCategory",
    SET_FORMS: "forms/setForms",
    SET_PARAM: "forms/setParam",
    SET_FORM_STATUS: "forms/setFormStatus",
    SET_FORM_STATUS_DIRECTLY: "forms/setFormStatusDirectly",
    SET_FIELDS: "forms/setFields",
    SET_OPTIONS: "forms/setOptions",
    SET_OPTIONS_CACHE: "forms/setOptionsCache"
  },
  actions: {
    ADD_FORM: "forms/addForm",
    REMOVE_FORMS: "forms/removeForm",
    EDIT_FORM: "forms/editForm",
    GET_FORM: "forms/getForm",
    CLEAR_FORM: "forms/clearForm",
    SET_STATUS: "forms/setStatus",
    FETCH: "forms/fetchForms"
  }
};
