function pollingApi(apiName, options = {}){
    const { filterFunc, timeout, successCallBack, failCallback, time } = options;
    const startTime = Date.now();
    const timer = setInterval(() => {
        const now = Date.now();
        if (now - startTime > timeout * 1000) {
            failCallback(data);
            clearInterval(timer);
        } else {
            fetch(apiName).then((data) => {
                if (filterFunc(data)) {
                    successCallBack(data);
                    clearInterval(timer);
                }
            })
        }
    }, time)
}