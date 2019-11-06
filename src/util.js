function toClasses(classList) {
  return classList
    .split(/\s+/)
    .filter(s => s)
    .map(s => `.${s}`)
    .join('')
}

export function tw(base, classes) {
  return classes ? `${base}${toClasses(classes)}` : toClasses(base)
}
