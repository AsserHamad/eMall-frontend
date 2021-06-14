import { CHANGE_LANGUAGE, CHANGE_FIRST_TIME } from './types';

export const changeLanguage = (language) => ({
    type: CHANGE_LANGUAGE,
    language
})

export const changeFirstTime = (firstTime) => ({
    type: CHANGE_FIRST_TIME,
    firstTime
})