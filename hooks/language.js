import { useState, useEffect } from 'react';
import * as englishText from '../assets/languages/en.json';
import * as arabicText from '../assets/languages/ar.json';
import { useSelector } from 'react-redux';
const languageText = [englishText, arabicText];

const useLanguageText = (block) => {
    const languageState = useSelector(state => state.generalReducer.language);
    const [language, setLanguage] = useState(languageText[languageState][block]);
    useEffect(() => {
        setLanguage(languageText[languageState][block]);
    }, [languageState]);
    return language;
}

const useLanguage = () => {
    const languageState = useSelector(state => state.generalReducer.language);
    return !languageState ? 'en' : 'ar';
}

export { useLanguageText, useLanguage };