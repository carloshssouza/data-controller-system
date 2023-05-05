class ArrayUtils {
  public deleteStringElement (array: string[], elementName: string) {
    const index = array.indexOf(elementName)

    if (index !== -1) {
      array.splice(index, 1)
    }

    return array
  }

  public updateStringElement (array: string[], oldElementName: string, newElementName: string) {
    const index = array.indexOf(oldElementName)

    if (index !== -1) {
      array[index] = newElementName
    }

    return array
  }
}

export default new ArrayUtils()
