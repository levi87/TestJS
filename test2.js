!(async () => {
let params = getParams($argument);
$httpClient.get(params.url, function(error, response, data) {
    if (error) {
        console.log(error);
        $done();
        return;
    }
    
    const result = JSON.parse(data);
    const bwLimit = result.monthly_bw_limit_b;
    const bwUsed = result.bw_counter_b;
    const bwResetDay = result.bw_reset_day_of_month;
    
    const today = new Date();
    let month = today.getMonth() + 2;
    if (month > 12) {
        month = 1;
    }
    
    const panel = {
        title: params.name || 'Server Info',
        content: `已使用流量：${(bwUsed / 1000000000).toFixed(3)} GB\n流量剩余：${((bwLimit - bwUsed) / 1000000000).toFixed(3)} GB\n下次重置日期：${month}月${bwResetDay}号`,
        icon: 'checkmark.seal'
    };
    
    $done(panel);
});
})();

function getParams(param) {
  return Object.fromEntries(
    $argument
      .split('$')
      .map((item) => item.split('*'))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
