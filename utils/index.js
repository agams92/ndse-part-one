const hasOwnProps = (targetObj, propsToCheck) => {
  return propsToCheck.every((propsName) => targetObj.hasOwnProperty(propsName));
};

module.exports = { hasOwnProps };
