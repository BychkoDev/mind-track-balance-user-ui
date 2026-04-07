import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
 
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
 
  // Використовуємо статику для Turbopack, щоб уникнути паніки парсера
  let messages;
  if (locale === 'uk') {
    messages = (await import('../../messages/uk.json')).default;
  } else {
    messages = (await import('../../messages/en.json')).default;
  }
 
  return {
    locale,
    messages
  };
});
