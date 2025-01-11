export function addProductCartClassName(
  className: string,
  index: number | undefined
) {
  return typeof index === "number" ? className + index : className;
}