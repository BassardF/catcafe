export default class FormatterServices {
  static formatPhoneNumber (number) {
    if (number && !number.includes('+')) {
      if (number.length === 9) return number.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
      if (number.length === 10) return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
    return number;
  }
  static formatWebsite (website) {
    const strings = ['https', 'http', '://', 'www.'];
    if (website) {
      for (var i = 0; i < strings.length; i++) {
        website = website.replace(new RegExp(strings[i], 'g'), '');
      }
    }
    website = website.replace(/\/$/, '');
    return website;
  }
}
