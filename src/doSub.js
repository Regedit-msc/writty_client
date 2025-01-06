
/**
 * checks if Push notification and service workers are supported by your browser
 */
function isPushNotificationSupported() {
    return "serviceWorker" in navigator && "PushManager" in window;
}

/**
 * asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
 */
function initializePushNotifications() {
    // request user grant to show notification
    return Notification.requestPermission(function (result) {
        return result;
    });
}




//checks if the browser supports push notification and service workers
const pushNotificationSuported = isPushNotificationSupported();

// function sendSubscription(subscription) {
//     console.log(subscription, "send sub");
//     return fetch('/notifications/subscribe', {
//         method: 'POST',
//         body: JSON.stringify(subscription),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
// }



const convertedVapidKey = urlBase64ToUint8Array("BHTYNVdgpNpQWcKTaas27uQFTBy2UiuaiBXmeu2sKeMeZXq4d01dKDDXlsFadM2PbBNHskiOeCNuzTn2kWxcc5M")

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4)
    // eslint-disable-next-line
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}



export function subscribeUser() {
    if (pushNotificationSuported) {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.pushManager.getSubscription().then(function (existedSubscription) {
                if (existedSubscription === null) {
                    initializePushNotifications().then((result) => {
                        console.log(result);
                        registration.pushManager.subscribe({
                            applicationServerKey: convertedVapidKey,
                            userVisibleOnly: true,
                        }).then(function (newSubscription) {
                            console.log('New subscription added.')
                            console.log(newSubscription)
                            localStorage.setItem("SUB", JSON.stringify(newSubscription));
                            localStorage.setItem("Subbed", true);
                            // sendSubscription(newSubscription)
                        }).catch(function (e) {
                            if (Notification.permission !== 'granted') {
                                alert("You didn't allow notifications to allow enable it from site settings.")
                                localStorage.setItem("Subbed", false);
                            } else {
                                console.error('An error ocurred during the subscription process.', e)
                            }
                        })
                    })

                } else {
                    console.log('Existing subscription detected.')
                    console.log(existedSubscription);
                    localStorage.setItem("Subbed", true);
                    localStorage.setItem("SUB", JSON.stringify(existedSubscription));
                    // sendSubscription(existedSubscription)
                }
            })
        })
            .catch(function (e) {
                console.error('An error ocurred during Service Worker registration.', e)
            })
    }
}



