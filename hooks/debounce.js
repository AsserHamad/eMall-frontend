const useDebounce = (func, time = 500) => {
    let timer;
    console.log('running timer on', time)
    return function(...args) {
        const context = this;
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            console.log('TIMES UP!!')
            timer = null;
            func.apply(context, args);
        }, time)
    }
};

export default useDebounce;