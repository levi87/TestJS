let url = "http://ip-api.com/json"

$httpClient.get(url, function(error, response, data){
    let jsonData = JSON.parse(data)
    let country = jsonData.country
    let emoji = getFlagEmoji(jsonData.countryCode)
    let city = jsonData.city
    let isp = jsonData.isp
    let ip = jsonData.query
    let org = jsonData.org
    let as = jsonData.as
    let rn = jsonData.regionName
    let timezone = jsonData.timezone
  body = {
    title: "节点信息",
    content: `IP信息：${ip}\n运营商：${isp}\n国家&地区：${emoji}${country} - ${rn}\n城市：${city}\nORG：${org}\nASN：${as}\n时区：${timezone}`,
    icon: "globe.asia.australia.fill"
  }
  $done(body);
});

function getFlagEmoji(countryCode) {
      if (countryCode.toUpperCase() == 'TW') {
    countryCode = 'CN'
  }
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)

}
