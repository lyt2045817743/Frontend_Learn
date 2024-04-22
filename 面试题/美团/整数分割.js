// 给一个整数 n，每三位数添加‘．’作为千位分隔符
 // 输入：n = "123456789"
 // 输出："123.456.789"

function formatNumber (target) {

    for (let i = target. length - 3; i > 0; i -= 3) {
        target = target.slice(0, i) + '' + target.slice(i, target. length);
    }

    return target;
}

 const result = formatNumber ("123456789");
 // const result = formatNumber("1123456789");

 console.log(result);