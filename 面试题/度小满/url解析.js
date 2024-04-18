// https://www.baidu.com/link?url=RLoXj_pgXNV33voB7TJMWkCsS1Vp9NaNW-VnC2FUW8_Gb3vD_1zrQ_D7h18BuWnI&wd=&eqid=c946a2a90007792600000002661f7535#/index

function getUrlInfo(url) {
    const { hash, searchParams, pathname, hostname, protocol, origin } = new URL(url);
    return {
        hash,
        query: searchParams,
        pathname,
        baseurl: origin,
        protocol,
        hostname
    }
}

const result = getUrlInfo('https://www.baidu.com/link?url=RLoXj_pgXNV33voB7TJMWkCsS1Vp9NaNW-VnC2FUW8_Gb3vD_1zrQ_D7h18BuWnI&wd=&eqid=c946a2a90007792600000002661f7535#/index');
console.log(result);