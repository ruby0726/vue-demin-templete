/**
 * 数字四舍五入，默认精确到2位小数
 * @param val
 * @param digits 小数位数，默认为2
 */
export function roundFix (val, digits = 2) {
    const base = Math.pow(10, digits)
    return isNaN(val) ? 0 : Math.round(val * base) / base
}