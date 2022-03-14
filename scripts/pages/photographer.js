//Mettre le code JavaScript lié à la page photographer.html
async function getPhotograph() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const data = await fetch("../../data/photographers.json").then((response) => response.json());
    const pageId = Number(urlParams.get('id'));
    const photographer = data["photographers"].filter(photographer => photographer.id === pageId)

    // Si le photographe n'est pas trouvé alors on redirige l'utilisateur vers la page d'accueil.
    if (photographer.length === 0) {
        location.assign("/");
    }

    return photographer[0];
}

async function getMedias(photograph) {
    const data = await fetch("../../data/photographers.json").then((response) => response.json());
    const medias = data["media"].filter(media => media.photographerId === photograph.id);

    return ({
        medias: [...medias]
    })
};

async function displayProfileData(photograph) {
    const profileSection = document.querySelector(".photograph_page");
    const photographModel = photographFactory(photograph);
    const profileCardDOM = photographModel.getProfileCardDOM();
    profileSection.prepend(profileCardDOM);
};

async function displayPhotographContent(photograph) {
    const photographMedias = document.querySelector(".photograph_medias")
    const { medias } = await getMedias(photograph);

    const filter = document.getElementById("filterSelector");
    let filterValue = filter.value;

    medias.sort((a, b) => (b.likes - a.likes)).forEach(async (media) => {
        media.photographerName = photograph.name;
        const mediaModel = photographFactory(media);
        const mediaCardDOM = await mediaModel.getMediaCardDOM();
        photographMedias.appendChild(mediaCardDOM);
    });

    updateTotalLikes(medias, photograph.price);

    filter.addEventListener("change", (event) => {
        filterValue = event.currentTarget.value;

        photographMedias.innerHTML = "";
        medias.sort((a, b) => filterValue === "popularity" ? b.likes - a.likes : filterValue === "date" ? new Date(b.date) - new Date(a.date) : filterValue === "title" ? b.title < a.title : b > a)
            .forEach(async (media) => {
                media.photographerName = photograph.name;
                const mediaModel = photographFactory(media);
                const mediaCardDOM = await mediaModel.getMediaCardDOM();
                photographMedias.appendChild(mediaCardDOM);
            });
        updateTotalLikes(medias, photograph.price);
    });

};

async function updateTotalLikes(medias, price) {
    let likes = 0;
    medias.map((media) => {
        likes = likes + media.likes
    });

    
    
    const statsLikes = document.querySelector(".photograph_stats_likes");
    statsLikes.innerText = `${likes.toString()} \u2764`
    const statsPrice = document.querySelector(".photograph_stats_price");
    statsPrice.innerText = `${price.toString()}€ / jour`;

    const likeButton = document.querySelectorAll(".photograph_media_informations_likes_button");

    const mediasContainer = document.querySelector('.photograph_medias');
    mediasContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('photograph_media_informations_likes_button')) {
            likes = likes + 1
            statsLikes.innerText = `${likes} \u2764`
        }
    });



}

async function init() {
    const photograph = await getPhotograph();
    displayProfileData(photograph);
    displayPhotographContent(photograph);
}

init();