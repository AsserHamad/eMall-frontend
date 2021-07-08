import { useState, useEffect } from 'react';
import HTTP from '../src/utils/axios';

const useCredit = (refresh) => {
    const [credit, setCredit] = useState(0);
    useEffect(() => {
        HTTP('/store/credit')
        .then(res => setCredit(res.credit));
    }, [refresh]);
    return credit;
}

export default useCredit;