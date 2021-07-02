import { useEffect } from 'react';

const useFocus = (onFocus, navigation) => {
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', onFocus);
        return unsubscribe;
    }, [navigation]);
}

export default useFocus;