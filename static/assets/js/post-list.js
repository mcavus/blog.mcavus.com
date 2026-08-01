/* Makes a whole index entry clickable without widening the link itself. The anchor still wraps
   the title alone, so the accessibility tree and keyboard order are unchanged: one link per post,
   named by its title. This forwards stray clicks from the date and excerpt, and bails out while
   text is selected. Without JS the title stays clickable on its own. */
(function () {
  var items = document.querySelectorAll(".post-item");

  function wire(item) {
    var link = item.querySelector(".post-item-title a");
    if (!link) return;

    /* gates the cursor and hover styles in CSS */
    item.classList.add("is-clickable");

    function forward(e) {
      /* a real link inside the entry handles itself */
      if (e.target.closest("a")) return;
      /* a reader dragging across the excerpt is quoting it, not navigating */
      if (String(window.getSelection())) return;

      /* middle-click and modifier-click mean "new tab" everywhere else; honour it here */
      if (e.type === "auxclick" || e.metaKey || e.ctrlKey || e.shiftKey) {
        window.open(link.href, "_blank", "noopener");
        return;
      }
      link.click();
    }

    item.addEventListener("click", forward);
    item.addEventListener("auxclick", function (e) {
      if (e.button === 1) forward(e);
    });
  }

  /* Overprint only appends an ellipsis past its 160-character limit, so shorter excerpts end on a
     full stop. Trade that stop for an ellipsis; CSS cannot, since it cannot read the text. */
  function trailOff(item) {
    var p = item.querySelector(".post-excerpt");
    if (!p) return;
    var node = p.firstChild;
    if (!node || node.nodeType !== 3) return;

    var s = node.nodeValue.replace(/\s+$/, "");
    if (/(…|\.\.\.)$/.test(s)) return; /* already truncated */
    if (/[!?]$/.test(s)) return; /* an emphatic ending is deliberate; leave it */
    node.nodeValue = s.replace(/\.$/, "") + "…";
  }

  for (var i = 0; i < items.length; i++) {
    wire(items[i]);
    trailOff(items[i]);
  }
})();
