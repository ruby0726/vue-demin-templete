export function forJudgment(val, arr, keyName, dataName) {
  let cbList = [];
  let cbData = '';
  if (val) {
    cbList = arr.filter(item => item[keyName] == val)
    if (cbList.length > 0) {
      cbData = cbList[0][dataName]
    }
  }
  return cbData
}
