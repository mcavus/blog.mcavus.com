/* A post's only "back to blog" link sits at the very top. On a long post the reader finishes at
   the bottom, a whole scroll away from it. This reveals a matching link at the foot of the post —
   but ONLY when the page actually scrolls. On a short post the top link never leaves the screen,
   so a second one would just be redundant clutter; there, this stays hidden.

   The foot link is hidden in CSS by default, so without JS it never shows and the top link is the
   single way home. */
(function () {
  var nav = document.querySelector(".post-foot-nav");
  if (!nav) return; // not a post page

  /* Slack so a page overflowing by only a few pixels doesn't qualify. Kept comfortably larger
     than the link's own height, so revealing it can never itself push a borderline page over the
     line and start a show/hide flip-flop. */
  var SLACK = 96;

  function sync() {
    var overflow = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle("is-visible", overflow > SLACK);
  }

  sync();
  /* Height keeps moving after the first paint: the web fonts swap in, images decode, the window
     resizes. Re-measure on each. */
  window.addEventListener("load", sync);
  window.addEventListener("resize", sync);
})();
