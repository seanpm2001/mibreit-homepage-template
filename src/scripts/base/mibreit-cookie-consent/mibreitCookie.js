var mibreitCookieConsent = function (config) {
  var setCookie = function(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) +  "; samesite=Lax" + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
  }

  var getCookie = function(c_name) {
    var i,
      x,
      y,
      ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
      x = x.replace(/^\s+|\s+$/g, "");
      if (x == c_name) {
        return unescape(y);
      }
    }
  }

  var cookieMessageGenerate = function() {
    var html =
      '<div>' +
      config.mainMessage +
      '</div><div class="mibreit-cookie-accept"><a href="#">' +
      config.acceptButton +
      "</a></div>";
    var cookieConsentBar = document.createElement("div");
    cookieConsentBar.setAttribute("id", "cookie-msg");
    cookieConsentBar.innerHTML = html;
    var cookieConsentDarkening = document.createElement("div");
    cookieConsentDarkening.setAttribute("id", "cookie-msg__background");
    var body = document.querySelector("body");
    body.append(cookieConsentDarkening);
    body.append(cookieConsentBar);
    document
      .querySelector("#cookie-msg .mibreit-cookie-accept")
      .addEventListener("click", function (event) {       
        event.preventDefault();
        setCookie(config.cookieName, true, config.expirationDays);
        cookieConsentBar.remove();
        cookieConsentDarkening.remove();
      });
  }
  
  var cookie = getCookie(config.cookieName);
  if (cookie !== "true") {
    cookieMessageGenerate();
  }  
};
