import isObject from "lodash/isObject";

export default function(ns) {
  if (!isObject(ns)) {
    throw new Error(
      "arguement must be an object containing the namespaces of the store."
    );
  }

  return {
    data() {
      return {
        // pageCount: 0,
        perPageOptions: [25, 50, 75, 100]
      };
    },
    computed: {
      pageCount() {
        return Math.ceil(this.total / this.limit);
      },
      total() {
        return this.$store.getters[ns.getters.QUERY_PARAMS]("total");
      },
      limit: {
        get() {
          return this.$store.getters[ns.getters.QUERY_PARAMS]("limit");
        },
        set(value) {
          this.$store.commit(ns.mutations.SET_PARAM, { param: "limit", value });
          this.$store.dispatch(ns.actions.FETCH, false);
        }
      },
      page: {
        get() {
          return this.$store.getters[ns.getters.QUERY_PARAMS]("page");
        },
        set(value) {
          this.$store.commit(ns.mutations.SET_PARAM, { param: "page", value });
          this.$store.dispatch(ns.actions.FETCH, false);
        }
      }
    }
  };
}
