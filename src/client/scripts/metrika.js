export default () => {
  const root = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  const noScript = document.createElement('noscript');

  noScript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/55205317" style="position:absolute; left:-9999px;" alt="" /></div>`;

  script.innerHTML = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      ym(55205317, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
      });`;

  document.body.insertAdjacentElement('afterbegin', noScript);
  root.appendChild(script);
}
