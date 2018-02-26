const MOQ = [
  'Wellington, WG, New Zealand',
  'Wellington Point, QL, Australia',
  'Wellingborough, EN, United Kingdom',
  'Wellington, CO, United States'
]

export default class FetchServices {
  static fetchCities (firstCharacters) {
    if (!firstCharacters || firstCharacters.length < 3) return new Promise((resolve, reject) => resolve([]))
    // else return fetch(`http://autocompletecity.geobytes.com/AutoCompleteCity?callback=?&sort=size&q=${firstCharacters}`)
    else return new Promise((resolve, reject) => resolve(MOQ))
  }
}
