function addDecimalPoint(num: number | string) {
  let numStr = num.toString();
  let firstPart = numStr.slice(0, -1);
  let lastDigit = numStr.slice(-1);
  return firstPart + '.' + lastDigit;
}
export default addDecimalPoint;
