/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
self.addEventListener('push', event => {
    const { title, body, image } = event.data.json();
    const options = {
        body: body,
        icon: image ?? "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFua3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
        vibrate: [200, 100, 200],
        image: image,
        badge: "https://spyna.it/icons/favicon.ico",
    }
    event.waitUntil(self.registration.showNotification(title, options));
})


