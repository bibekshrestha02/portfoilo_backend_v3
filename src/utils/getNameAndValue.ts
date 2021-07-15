export function getNameAndValue(data: any) {
  let newObj: any = {};

  if (!Array.isArray(data)) {
    newObj[data.name] = data.value;
    return newObj;
  }
  data.forEach((e) => (newObj[e.name] = e.value));
  return newObj;
}
