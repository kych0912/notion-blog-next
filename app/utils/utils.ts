import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isEmpty } from 'remeda';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isEmptyOrWhitespace = (str: string) => {
  if (typeof str !== 'string') {
    return isEmpty(str);
  }
  return isEmpty(str.replace(/\s/g, '').trim());
};
