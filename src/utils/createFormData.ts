export default function createFormData(values: any) {
  const formData = new FormData()

  const keys = Object.keys(values)

  for (const key of keys) {
    if (
      key !== 'thumbnail' &&
      key !== 'thumbnailPath' &&
      key !== 'gif' &&
      key !== 'gifPath' &&
      key !== 'ProjectHasTags'
    ) {
      const value = values[key]
      if (typeof value === 'object' && value[0] && value[0].length) {
        formData.append(key, value[0])
      } else if (value.length) {
        formData.append(key, value)
      }
    }
  }

  return formData
}
