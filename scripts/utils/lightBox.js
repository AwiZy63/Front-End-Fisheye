const lightBoxCloseButton = document.getElementById("closeLightbox");
const lightBox = document.getElementById("lightbox");

const medias = [
    {
        "id": 342550,
        "photographerId": 82,
        "title": "Fashion Yellow Beach",
        "image": "Fashion_Yellow_Beach.jpg",
        "likes": 62,
        "date": "2011-12-08",
        "price": 55
    },
    {
        "id": 8520927,
        "photographerId": 82,
        "title": "Fashion Urban Jungle",
        "image": "Fashion_Urban_Jungle.jpg",
        "likes": 11,
        "date": "2011-11-06",
        "price": 55
    },
    {
        "id": 9025895,
        "photographerId": 82,
        "title": "Fashion Pattern on a Pattern",
        "image": "Fashion_Pattern_on_Pattern.jpg",
        "likes": 72,
        "date": "2013-08-12",
        "price": 55
    },
    {
        "id": 9275938,
        "photographerId": 82,
        "title": "Wedding Gazebo",
        "image": "Event_WeddingGazebo.jpg",
        "likes": 69,
        "date": "2018-02-22",
        "price": 55
    },
    {
        "id": 2053494,
        "photographerId": 82,
        "title": "Sparkles",
        "image": "Event_Sparklers.jpg",
        "likes": 2,
        "date": "2020-05-25",
        "price": 55
    },
    {
        "id": 7324238,
        "photographerId": 82,
        "title": "18th Anniversary",
        "image": "Event_18thAnniversary.jpg",
        "likes": 33,
        "date": "2019-06-12",
        "price": 55
    },
    {
        "id": 8328953,
        "photographerId": 82,
        "title": "Wooden sculpture of a horse",
        "video": "Art_Wooden_Horse_Sculpture.mp4",
        "likes": 24,
        "date": "2011-12-08",
        "price": 100
    }
]

function displayLightbox(/*medias*/) {
    console.log("Lightbox displayed");
    lightBox.style.display = 'flex';



    source = "/assets/medias/Ellie Rose/Sport_Jump.jpg";
    const lightBoxContent = document.querySelector(".lightbox-content");

    const mediaTemplate = document.querySelector(".lightbox-content-media");
    const mediaElement = document.createElement(mediaType === "video" ? "video" : "img");

    mediaElement.setAttribute("src", source);
    mediaElement.classList.add("lightbox-content-media");

    //lightBoxContent.appendChild(mediaElement);
    mediaTemplate.replaceWith(mediaElement);
}

lightBoxCloseButton.addEventListener("click", hideLightbox);

function hideLightbox() {
    lightBox.style.display = 'none';
}