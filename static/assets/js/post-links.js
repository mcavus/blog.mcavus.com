/* Two things for links inside a post body, neither of which Markdown can express.

   Face: a link whose visible text is its own address gets the typewriter face via .url; a link
   whose text is a name keeps the paragraph face. CSS cannot compare an element's text to its
   href, so the comparison happens here — scheme, "www." and a trailing slash are dropped from
   both sides before matching.

   Target: links leaving the site open in a new tab. Same-origin links do not, so a link to
   another post still reads as moving within the blog. rel follows mcavus.com's convention —
   noreferrer for third parties, noopener alone for mcavus.com's own hosts, where stripping the
   referrer would only hide the traffic from itself.

   Without JS the links still work: they stay in the paragraph face and open in the same tab. */
(function () {
  function bare(s) {
    return String(s)
      .trim()
      .toLowerCase()
      .replace(/^mailto:/, "")
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/+$/, "");
  }

  /* prose only — the tag chips are chrome, and a tag named like a domain should not become one */
  var links = document.querySelectorAll(".post a");
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    if (a.closest(".post-tags")) continue;
    var href = a.getAttribute("href") || "";

    if (bare(a.textContent) === bare(href)) a.classList.add("url");

    /* a.host is resolved against the document, so relative hrefs match our own origin */
    var leavesSite = /^https?:/i.test(href) && a.host !== location.host;
    if (leavesSite) {
      a.target = "_blank";
      a.rel = /(^|\.)mcavus\.com$/i.test(a.host) ? "noopener" : "noopener noreferrer";
    }
  }
})();
