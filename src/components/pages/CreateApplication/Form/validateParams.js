import { phoneUtils } from '@creditclub/helpers';

export default {
  requiredFields: ['email', 'phone', 'person'],

  test: {
    email(value) {
      const mailReg = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

      return mailReg.test(value);
    },

    phone(value) {
      return phoneUtils.isValid(phoneUtils.unParse(value));
    },

    person(person) {
      return person.isFull();
    },
  },
};
