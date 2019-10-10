export function classes(strings) {
  console.warn('Make this work with interpolation')
  return strings.raw[0].split(/\s+/).filter(s => s).map(s => `.${s}`).join('')
}
