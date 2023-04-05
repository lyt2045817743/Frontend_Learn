function longRunningOperation() {
  console.log('开始计算');
  let count = 0;
  for(let i = 0; i < 5000000000; i++) {
    count+=2;
  }
  console.log('计算结束');
  return count;
}

// 接收消息
onmessage = function(event) {
  console.log('内部收到消息：', event.data);

  // 运行长时间操作
  var result = longRunningOperation();

  // 发送消息
  postMessage(result);
  console.log('完成');
};