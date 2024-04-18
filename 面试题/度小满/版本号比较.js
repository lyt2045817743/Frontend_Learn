function compareVersion(version1, version2){
    const version1Arr = version1.split('.');
    const version2Arr = version2.split('.');
    const length = Math.max(version1Arr.length, version2Arr.length);

    for (let i = 0; i < length; i++) {
        const version1Val = version1Arr[i] || '0';
        const version2Val = version2Arr[i] || '0';
        if (version1Val > version2Val) {
            return 1;
        } else if (version1Val < version2Val){
            return -1;
        } else if (i === length - 1) {
            return 0;
        }
    }
}

const result = compareVersion('2.0.0', '2.0');
console.log(result);