<script>
import { VTextField, VTextarea } from "vuetify/lib";

const propFilter = {
  textfield: ["value", "outlined", "fill", "label", "readonly"],
  textarea: ["value", "outlined", "fill", "label", "readonly"],
  select: ["value", "items", "itemText", "itemValue"],
  checkbox: ["value", "multiple", "outlined", "fill", "inputValue"],
  multiple: ["value", "label", "outlined", "fill"]
};

export default {
  name: "Answer",

  props: {
    type: {
      type: String
    },
    value: {
      type: [String, Number, Array, Boolean]
    },
    outlined: {
      type: Boolean,
      default: false
    },
    fill: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    items: {
      type: [Object, Array],
      default: () => []
    },
    itemText: {
      type: String,
      default: "name"
    },
    itemValue: {
      type: String,
      default: "id"
    },
    inputValue: {
      type: String,
      default: "value"
    }
  },

  methods: {
    getComponent() {
      switch (this.type) {
        case "textfield":
          return VTextField;
        case "textarea":
          return VTextarea;
        default:
          break;
      }
    }
  },

  render(h) {
    console.log(this.type);
    /**
     * We filter out type because we don't want that passed through to the component.
     */
    const props = Object.entries(this.$props).reduce((obj, [key, value]) => {
      const p = propFilter[this.type];
      if (p.indexOf(key) !== -1) obj[key] = value;
      return obj;
    }, {});

    const options = {
      props: { ...props },
      attrs: { disabled: this.disabled },
      on: {
        input: value => this.$emit("input", value),
        change: evt => this.$emit("change", evt)
      }
    };

    const Component = this.getComponent();

    return h(Component, options);
  }
};
</script>