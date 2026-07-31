/* Cloudflare Web Analytics — cookieless, so no consent banner is required.
   Token comes from dash.cloudflare.com > Analytics & Logs > Web Analytics.
   It is not a secret; it ships in the page either way.

   This is the blog's own token, separate from mcavus.com's, so the two sets of numbers stay
   apart. The file is otherwise the same on both sites. */
var CF_BEACON_TOKEN = "85346f73817e449697704a0ed67c8fce";

(function () {
  /* Skip while developing, so local visits stay out of the numbers. */
  var host = location.hostname;
  if (host === "localhost" || host === "127.0.0.1" || host === "") return;
  if (!CF_BEACON_TOKEN || CF_BEACON_TOKEN.indexOf("PASTE") !== -1) return;

  var s = document.createElement("script");
  /* type=module matches the snippet Cloudflare currently issues; the beacon is
     an ES module, and module scripts are deferred by default. */
  s.type = "module";
  s.src = "https://static.cloudflareinsights.com/beacon.min.js";
  s.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_BEACON_TOKEN }));
  document.head.appendChild(s);
})();
