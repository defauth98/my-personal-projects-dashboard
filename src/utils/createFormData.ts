export default function createFormData(values: any) {
  const formData = new FormData()

  const keys = Object.keys(values)

  for (const key of keys) {
    const value = values[key]

    if (typeof value === 'object') {
      formData.append(key, value[0])
    } else {
      formData.append(key, value)
    }
  }

  return formData
}
