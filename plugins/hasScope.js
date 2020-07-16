import get from "lodash/get";

const defaultOptions = {
  permissionsProp: "scope",
  userObject: "user"
};

const isString = val => typeof val === "string";
const isArray = val => Array.isArray(val);

const hasScope = function(auth) {
  return function(required, options) {
    if (required) {
      if (isString(required)) {
        required = [[required]];
      } else if (isArray(required) && required.every(isString)) {
        required = [required];
      }
    }

    let _options = Object.assign({}, defaultOptions, options);

    let user = get(auth, _options.userObject, undefined);

    if (!user) {
      throw new Error(`userObject: ${_options.userObject} is invalid.`);
    }

    let permissions = get(user, _options.permissionsProp, undefined);

    if (!permissions) {
      throw new Error(
        `permissionProp: ${_options.permissionsProp} is invalid.`
      );
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
};

export default ({ $auth }) => {
  $auth.hasScope = hasScope($auth);
  //   inject("hasScope", hasScope.bind($auth.user));
};
