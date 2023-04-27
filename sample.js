# WARP Personal
☁ WARP Personal Request = type=http-request,pattern=^https?:\/\/(api|zero-trust-client)\.cloudflareclient\.com\/(.*)\/reg\/[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$, requires-body=1, script-path=https://raw.githubusercontent.com/VirgilClyne/Cloudflare/main/js/Cloudflare.1.1.1.1.request.js
☁ WARP Personal Response = type=http-response,pattern=^https?:\/\/(api|zero-trust-client)\.cloudflareclient\.com\/(.*)\/reg\/[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$, requires-body=1, script-path=https://raw.githubusercontent.com/VirgilClyne/Cloudflare/main/js/Cloudflare.1.1.1.1.response.js
# Cloudflare for Teams
☁ WARP Teams Request = type=http-request,pattern=^https?:\/\/(api|zero-trust-client)\.cloudflareclient\.com\/(.*)\/reg\/t\.[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$, requires-body=1, script-path=https://raw.githubusercontent.com/VirgilClyne/Cloudflare/main/js/Cloudflare.1.1.1.1.request.js
☁ WARP Teams Response = type=http-response,pattern=^https?:\/\/(api|zero-trust-client)\.cloudflareclient\.com\/(.*)\/reg\/t\.[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$, requires-body=1, script-path=https://raw.githubusercontent.com/VirgilClyne/Cloudflare/main/js/Cloudflare.1.1.1.1.response.js

[MITM]
hostname = %APPEND% api.cloudflareclient.com, zero-trust-client.cloudflareclient.com
