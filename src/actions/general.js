import { CHANGE_LANGUAGE, CHANGE_FIRST_TIME, CHANGE_VARIABLES } from './types';

export const changeLanguage = (language) => ({
    type: CHANGE_LANGUAGE,
    language
})

export const changeFirstTime = (firstTime) => ({
    type: CHANGE_FIRST_TIME,
    firstTime
})

export const changeVariables = (variables) => ({
    type: CHANGE_VARIABLES,
    variables
})