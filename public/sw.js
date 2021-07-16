self.addEventListener('push', event => {
    const { title, body, image } = event.data.json();
    const options = {
        body: body,
        icon: image ?? "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads02&accessoriesType=Round&hairColor=SilverGray&facialHairType=MoustacheFancy&facialHairColor=Black&clotheType=ShirtScoopNeck&clotheColor=Gray01&eyeType=EyeRoll&eyebrowType=Default&mouthType=Concerned&skinColor=Tanned",
        vibrate: [200, 100, 200],
        image: image,
        badge: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads02&accessoriesType=Round&hairColor=SilverGray&facialHairType=MoustacheFancy&facialHairColor=Black&clotheType=ShirtScoopNeck&clotheColor=Gray01&eyeType=EyeRoll&eyebrowType=Default&mouthType=Concerned&skinColor=Tanned",
    }
    event.waitUntil(self.registration.showNotification(title, options));
})


