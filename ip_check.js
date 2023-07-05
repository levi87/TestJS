let url = "https://api.ip.sb/geoip"

$httpClient.get(url, function(error, response, data){
    let jsonData = JSON.parse(data)
    let country = jsonData.country
    let emoji = getFlagEmoji(jsonData.country_code)
    let city = jsonData.city ? jsonData.city : "NA"
    let isporg = jsonData.organization
    let isp = jsonData.isp
    let ip = jsonData.ip
    let org = jsonData.asn_organization
    let as = jsonData.asn
    let ascode = jsonData.continent_code
    let rn = jsonData.region ? jsonData.region : "NA"
    let rc = jsonData.region_code ? ` , ${jsonData.region_code}` : ``
    let timezone = jsonData.timezone
  body = {
    title: "节点信息",
    content: `IP信息：${ip}\n运营商：${isporg}\n国家/地区：${emoji}${country}\n行政区：${rn}\n城市：${city}\nASN：AS${as} - ${org}\n时区：${timezone}`,
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
