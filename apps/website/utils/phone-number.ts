import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

const getInstance = (phoneNumber: string) => {
  const instance = PhoneNumberUtil.getInstance();
  return {
    instance,
    number: instance.parse(phoneNumber, 'FR'),
  };
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  const { instance, number } = getInstance(phoneNumber);

  return instance.format(number, PhoneNumberFormat.E164);
};
