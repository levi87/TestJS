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
    const lineType = ['𝘾𝙈𝙄 ', '𝘾𝙈𝙄+𝙉𝙏𝙏 ', '𝙄𝙋𝙇𝘾 ', '', '𝙂𝙄𝘼', '𝙂𝙄𝘼-𝙀'];
    const crType = ['𝘾𝙉 ', '𝙃𝙆 ', '𝙐𝙎 ', '𝙇𝘼 ', '𝙅𝙋 ', '𝙎𝙂 ', '𝙐𝙆 ', '𝙏𝙒 ', '𝙆𝙍 ', '𝙇𝙊𝙉𝘿𝙊𝙉 ', ''];
    
    const today = new Date();
    var month = 0;
    if (bwResetDay >= today.getDay()) {
        month = today.getMonth() + 1;
    } else {
        month = today.getMonth() + 2;
    }
    if (month > 12) {
        month = 1;
    }
    
    const panel = {
        title: `${params.name}${crType[params.crnum]}${lineType[params.linenum]}𝙉𝙤𝙙𝙚 𝙎𝙚𝙧𝙫𝙚𝙧 𝙄𝙣𝙛𝙤`,
        content: `已用流量：${(bwUsed / 1000000000).toFixed(3)} GB\n剩余流量：${((bwLimit - bwUsed) / 1000000000).toFixed(3)} GB\n重置日期：${month}月${bwResetDay}号`,
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
