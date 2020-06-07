import reduce from "lodash/reduce";
export default function removeNamespace(namespace, types) {
  return reduce(
    types,
    (type, typeValue, typeKey) => {
      type[typeKey] = reduce(
        typeValue,
        (obj, v, k) => {
          obj[k] = v.replace(namespace, "");
          return obj;
        },
        {}
      );
      return type;
    },
    {}
  );
}
