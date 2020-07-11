import get from "lodash/get";

const defaultOptions = {
  permissionsProp: "scope"
};

const isString = val => typeof val === "string";
const isArray = val => Array.isArray(val);

const hasScope = function(required, options) {
  if (required) {
    if (isString(required)) {
      required = [[required]];
    } else if (isArray(required) && required.every(isString)) {
      required = [required];
    }
  }

  let _options = Object.assign({}, defaultOptions, options);

  let permissions = get(this, _options.permissionsProp, undefined);

  if (!permissions) {
    throw new Error("User permissions are missing.");
  }

  if (isString(permissions)) {
    permissions = permissions.split(" ");
  }

  if (!isArray(permissions)) {
    throw new Error("User permissions should be an array.");
  }

  const sufficient = required.some(req =>
    req.every(perm => permissions.indexOf(perm) !== -1)
  );

  return sufficient;
};

export default ({ $auth }) => {
  $auth.hasScope = hasScope.bind($auth.user);
  //   inject("hasScope", hasScope.bind($auth.user));
};
