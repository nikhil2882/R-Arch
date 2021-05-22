module.exports = function(string, start, delCount, newSubStr) {
  return string.slice(0, start) + newSubStr + string.slice(start + Math.abs(delCount));
};