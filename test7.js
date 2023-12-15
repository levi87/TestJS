!(async () => {
let params = getParams($argument);
$httpClient.post(params.url, function(error, response, data) {
    if (error) {
        console.log(error);
        $done();
        return;
    }

    var mybwdata = /<(.*?)>([^<]+)<\/bw>/.exec(data);
    var mybwarr = mybwdata[2].split(',');
    // console.log(mybwarr);
    // var myaddress = /<(.*?)>([^<]+)<\/ipaddress>/.exec(data);
    // console.log(myaddress[2])
    var hostName = /<hostname>([^<]+)<\/hostname>/.exec(data);
    var hostIp = /<ipaddress>([^<]+)<\/ipaddress>/.exec(data);
    
    // const result = JSON.parse(data);
    const bwLimit = mybwarr[0];
    const bwUsed = mybwarr[1];
    // const bwResetDay = result.bw_reset_day_of_month;
    // const lineType = ['𝘾𝙈𝙄 ', '𝘾𝙈𝙄+𝙉𝙏𝙏 ', '𝙄𝙋𝙇𝘾 ', '', '𝙂𝙄𝘼', '𝙂𝙄𝘼-𝙀'];
    // const crType = ['𝘾𝙉 ', '𝙃𝙆 ', '𝙐𝙎 ', '𝙇𝘼 ', '𝙅𝙋 ', '𝙎𝙂 ', '𝙐𝙆 ', '𝙏𝙒 ', '𝙆𝙍 ', '𝙇𝙊𝙉𝘿𝙊𝙉 ', ''];
    // const verType = ['𝙑𝟭 ' ,'𝙑𝟮 ' ,'𝙑𝟯 ' , ''];

    // const today = new Date();
    // var month = 0;
    // if (bwResetDay >= today.getDate()) {
    //     month = today.getMonth() + 1;
    // } else {
    //     month = today.getMonth() + 2;
    // }
    // if (month > 12) {
    //     month = 1;
    // }

    const panel = {
        // title: `𝙎𝙩𝙧𝙚𝙖𝙢 𝙈𝙚𝙙𝙞𝙖 𝙉𝙤𝙙𝙚 𝙎𝙚𝙧𝙫𝙚𝙧 𝙄𝙣𝙛𝙤`,
        title: `𝙎𝙩𝙧𝙚𝙖𝙢 𝙈𝙚𝙙𝙞𝙖 ${hostName[0]}・${hostIp[0]}`,
        content: `🆄${(bwUsed / 1000000000).toFixed(3)} GB | 🆁${((bwLimit - bwUsed) / 1000000000).toFixed(3)} GB`,
        icon: 'server.rack'
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
