/* eslint-disable no-undef */
self.addEventListener('push', event => {
    const { title, body, image } = event.data.json();
    const options = {
        body: body,
        icon: image ?? "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads02&accessoriesType=Round&hairColor=SilverGray&facialHairType=MoustacheFancy&facialHairColor=Black&clotheType=ShirtScoopNeck&clotheColor=Gray01&eyeType=EyeRoll&eyebrowType=Default&mouthType=Concerned&skinColor=Tanned",
        vibrate: [200, 100, 200],
        image: image ?? "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads02&accessoriesType=Round&hairColor=SilverGray&facialHairType=MoustacheFancy&facialHairColor=Black&clotheType=ShirtScoopNeck&clotheColor=Gray01&eyeType=EyeRoll&eyebrowType=Default&mouthType=Concerned&skinColor=Tanned",
        badge: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads02&accessoriesType=Round&hairColor=SilverGray&facialHairType=MoustacheFancy&facialHairColor=Black&clotheType=ShirtScoopNeck&clotheColor=Gray01&eyeType=EyeRoll&eyebrowType=Default&mouthType=Concerned&skinColor=Tanned",
    }
    event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', (event) => {
    event.waitUntil(
        self.clients.matchAll().then((clientList) => {
            if (clientList.length > 0) {
                clientList[0].navigate('/notifications').then((client) => client.focus());
                return event.notification.close();
            }
            self.clients.openWindow('/notifications');
            return event.notification.close();
        })
    );
});


