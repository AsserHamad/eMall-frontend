import { useState, useEffect } from 'react';
import { Constants } from 'react-native-unimodules';
import { useSelector } from 'react-redux';

const useCredit = (refresh) => {
    const token = useSelector(state => state.authReducer.token);
    const [credit, setCredit] = useState(0);
    useEffect(() => {
        console.log('refreshing')
        fetch(`${Constants.manifest.extra.apiUrl}/store/credit`, {headers: {token}})
        .then(res => res.json())
        .then(res => setCredit(res.credit));
    }, [refresh]);
    return credit;
}

export default useCredit;