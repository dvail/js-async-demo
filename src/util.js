console.warn('Make this work with interpolation')

export function classes(strings) {
  return strings.raw[0].split(/\s+/).filter(s => s).map(s => `.${s}`).join('')
}
