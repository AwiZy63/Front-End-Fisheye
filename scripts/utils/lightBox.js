const lightBoxCloseButton = document.getElementById("closeLightbox");
const lightBox = document.getElementById("lightbox");

async function displayLightbox(medias, selectedMedia) {
    console.log("Lightbox displayed");
    lightBox.style.display = 'flex';
console.log(selectedMedia)
    console.log(medias)

    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");

    if (leftArrow && rightArrow) {
        leftArrow.addEventListener("click", previousMedia);
        rightArrow.addEventListener("click", nextMedia);
    }

    let count = selectedMedia;
    let media = medias[count];

    const { name } = await getPhotograph(media.photographerId);

    const photographName = name.split(" ")[0].replace("-", " ");
    // source = "/assets/medias/Ellie Rose/Sport_Jump.jpg";
    const mediaSource = `/assets/medias/${photographName}/${media.image ? media.image : media.video}`;
    const mediaType = media.image ? "img" : "video";
    const lightBoxContent = document.querySelector(".lightbox-content");
    const mediaTitle = document.querySelector(".lightbox-content-title");
    mediaTitle.innerText = media.title;

    const mediaTemplate = document.querySelector(".lightbox-content-media");
    const mediaElement = document.createElement(mediaType === "video" ? "video" : "img");

    mediaElement.setAttribute("src", mediaSource);
    mediaElement.setAttribute("alt", media.title);

    if (mediaType === "video") {
        mediaElement.setAttribute("controls", "");
        mediaElement.setAttribute("autoplay", "");
        mediaElement.setAttribute("muted", "");
        mediaElement.setAttribute("loop", "");
        mediaElement.setAttribute("type", "video/mp4");
    }

    mediaElement.classList.add("lightbox-content-media");

    //lightBoxContent.appendChild(mediaElement);
    mediaTemplate.replaceWith(mediaElement);

    function previousMedia() {
        count = count - 1;
        media = medias[count];

        if (!media) {
            count = medias.length - 1;
            media = medias[count];
        }

        updateMedia(media);
    }
    function nextMedia() {
        count = count + 1;
        media = medias[count];

        if (!media) {
            count = 0;
            media = medias[count];
        }

        updateMedia(media);
    }

    function updateMedia(media) {
        const mediaContainer = document.getElementById("lightboxMediaContainer");
        
        const newMediaSource = `/assets/medias/${photographName}/${media.image ? media.image : media.video}`;

        mediaTitle.innerText = media.title;

        if (media.image) {
            mediaContainer.innerHTML = `<img class="lightbox-content-media" src="${newMediaSource}" alt="${media.title}" />`;
        } else {
            mediaContainer.innerHTML = `<video class="lightbox-content-media" src="${newMediaSource}" alt="${media.title}" controls="" autoplay="" muted="" loop="" type="video/mp4"></video>`;
        }
    }
}

lightBoxCloseButton.addEventListener("click", hideLightbox);

function hideLightbox() {
    lightBox.style.display = 'none';
}