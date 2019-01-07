const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// const firestore = new Firestore();
// const settings = { timestampsInSnapshots: true};
// firestore.settings(settings);


const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello Ninjas!");
});

const createNotification = notification => {
    return admin.firestore().collection('notifications').add(notification).then((doc)=>console.log('Notification added ',doc));
}

exports.orderPlaced = functions.firestore.document('orders/{orderId}')
.onCreate(doc => {
    const order = doc.data();
    const notification = {
        content: 'placed a new order',
        orderId: doc.id,
        uid: order.uid,
        type: "order",
        time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
});

exports.customerJoined = functions.auth.user().onCreate(user => {
    return admin.firestore().collection("users")
    .doc(user.uid).get().then((doc) => {
        const notification = {
            content : 'Joined A new Customer',
            type:'customer',
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification);
    })
})

