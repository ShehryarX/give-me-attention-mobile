const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

/**
 * [valueObject.from] is the username of the person request attention.
 * [valueObject.to] is the username of the person who the notification should be sent to.
 *
 * You can just push notification objects to /messages/ using the `.push()` method and
 * this Firebase Function will listen to changes made in that folder.
 *
 * For this to work, the client must be listening to the topic on it's current username.
 */
exports.pushNotification = functions.database
  .ref("/messages/{pushId}")
  .onWrite((event) => {
    console.log("STRINGIFIED:");
    console.log(JSON.stringify(event));
    const valueObject = event.after.val();

    const payload = {
      notification: {
        title: `${valueObject.from} needs some attention!`,
        sound: "default",
      },
    };

    console.log(
      `Push notification from ${valueObject.from} to ${valueObject.to}.`
    );

    const options = {
      priority: "high",
      timeToLive: 60 * 60 * 24,
    };

    return admin.messaging().sendToTopic(valueObject.to, payload, options);
  });
