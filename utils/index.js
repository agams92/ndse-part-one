const hasOwnProps = (targetObj, propsToCheck) => {
  return propsToCheck.every((propsName) => targetObj[propsName]);
};

module.exports = { hasOwnProps };
