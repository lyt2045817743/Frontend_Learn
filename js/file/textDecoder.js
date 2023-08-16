// 文字编码
const text = ''

const encoder = new TextEncoder();

const textByEncode = encoder.encode(text);

console.log('编码：', textByEncode);

// 文字解码
const decoder = new TextDecoder();

const textByDecode = decoder.decode(textByEncode);

console.log('解码：', textByDecode);