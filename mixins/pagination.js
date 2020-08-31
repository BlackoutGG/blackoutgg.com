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
        perPageOptions: [25, 50, 75, 100]
      };
    },

    watch: {
      pageCount(newVal, oldVal) {
        if (newVal < this.page) this.setParam("page", this.page - 1);
      }
    },

    methods: {
      setParam(param, value) {
        this.$store.commit(ns.mutations.SET_PARAM, { param, value });
      },
      fetch(extra = false) {
        this.$store.dispatch(ns.actions.FETCH, extra);
      }
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
          this.setParam("limit", value);
          this.fetch(false);
          // this.$store.commit(ns.mutations.SET_PARAM, { param: "limit", value });
          // this.$store.dispatch(ns.actions.FETCH, false);
        }
      },
      page: {
        get() {
          return this.$store.getters[ns.getters.QUERY_PARAMS]("page");
        },
        set(value) {
          this.setParam("page", value);
          this.fetch(false);
          // this.$store.commit(ns.mutations.SET_PARAM, { param: "page", value });
          // this.$store.dispatch(ns.actions.FETCH, false);
        }
      },
      sortBy: {
        get() {
          return this.$store.getters[ns.mutations.QUERY_PARAMS]("sortBy");
        },
        set(value) {
          this.setParam("sortBy", value);
          this.fetch(false);
        }
      }
    }
  };
}
