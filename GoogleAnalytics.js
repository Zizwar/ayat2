

var CLIENT_ID_KEY = "settings:clientId"; 
var analytics = navigator.analytics;

if (analytics) {
  analytics.setTrackingId("UA-45806093-6");
  analytics.set(analytics.Fields.CLIENT_ID, getClientId());
  analytics.set(analytics.Fields.APP_NAME, "تطبيق أخبار جامعة الملك سعود");
  analytics.sendEvent("application", "start");
}

function getClientId() {
  var clientId = localStorage.getItem(CLIENT_ID_KEY);
  if (clientId == null) {
    clientId = generateUUID();
    localStorage.setItem(CLIENT_ID_KEY, clientId);
  }
  return clientId;
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
  });
}

module.exports = {

  sendEvent: function (category, action, label) {
    if (analytics) {
      analytics.sendEvent(category, action, label);
    }
  }

};
