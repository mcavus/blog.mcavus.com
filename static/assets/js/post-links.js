/* Two things for links inside a post body, neither of which Markdown can express.

   Face: a link whose visible text is its own address gets the typewriter face via .url; a link
   whose text is a name keeps the paragraph face. CSS cannot compare an element's text to its
   href, so the comparison happens here — scheme, "www." and a trailing slash are dropped from
   both sides before matching.

   Target: links leaving the blog open in a new tab. A link to another post does not, so it still
   reads as moving within the blog. Same origin is not the test — the blog is served under the main
   site, so a link there shares the host while still leaving. rel follows mcavus.com's convention —
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

    /* Every page sits flat in one directory, so that directory is the blog. a.host and a.pathname
       are resolved against the document, which makes this hold for a relative href too. */
    var base = location.pathname.replace(/[^/]*$/, "");
    var leavesBlog = a.host !== location.host || a.pathname.indexOf(base) !== 0;
    if (leavesBlog) {
      a.target = "_blank";
      a.rel = /(^|\.)mcavus\.com$/i.test(a.host) ? "noopener" : "noopener noreferrer";
    }
  }
})();
