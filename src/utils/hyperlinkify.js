export function convertTextLinksToHyperLinks(classname) {
  const replacePattern1 =
    /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/gim;
  const elems = Array.prototype.filter.call(
    document.querySelectorAll(classname),
    function (x) {
      return x.textContent.match(replacePattern1);
    }
  );
  for (let i = 0; i < elems.length; i++) {
    console.log(elems[i].innerHTML.indexOf("<a"));
    console.log(elems[i].innerHTML.indexOf("<a"));
    if (
      elems[i].innerHTML.indexOf("<a") > -1 ||
      elems[i].innerHTML.indexOf('target="_blank"') > -1
    ) {
      continue;
    } else {
      elems[i].innerHTML = elems[i].innerHTML.replace(
        replacePattern1,
        `<a href="$1" target="_blank" ${
          elems[i].textContent.match("live-gists")
            ? ""
            : 'rel = "noreferrer noopener"'
        } >$1</a>`
      );
    }
  }
}