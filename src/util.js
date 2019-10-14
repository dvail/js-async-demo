function toClasses(classList) {
  return classList
    .split(/\s+/)
    .filter(s => s)
    .map(s => `.${s}`)
    .join('')
}

export function twComponent(base, classes) {
  return classes ? `${base}${toClasses(classes)}` : toClasses(base)
}
