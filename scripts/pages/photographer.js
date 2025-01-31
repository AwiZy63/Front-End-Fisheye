/**
 * It fetches the data from the photographers.json file and returns the photographer with the specified
 * id.
 * @returns A promise.
 */
const getPhotograph = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const data = await fetch('./data/photographers.json').then((response) => response.json());
  const pageId = Number(urlParams.get('id'));
  const photographer = data.photographers.filter(photographer => photographer.id === pageId);

  // Si le photographe n'est pas trouvé alors on redirige l'utilisateur vers la page d'accueil.
  if (photographer.length === 0) {
    location.assign('/');
  }

  return photographer[0];
}

/**
 * It fetches the data from the photographers.json file and filters the media array to only include the
 * media that have the same photographerId as the photograph.
 * @param photograph - The photograph to get the medias for.
 * @returns An object with a key of medias and a value of an array of media objects.
 */
const getMedias = async (photograph) => {
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  const medias = data.media.filter(media => media.photographerId === photograph.id);

  return ({
    medias: [...medias]
  });
};

/**
 * It displays the profile card for the photograph.
 * @param photograph - the photograph object that we want to display
 */
const displayProfileData = async (photograph) => {
  const profileSection = document.querySelector('.photograph_page');
  // eslint-disable-next-line no-undef
  const photographModel = photographFactory(photograph);
  const profileCardDOM = photographModel.getProfileCardDOM();

  const contactButton = document.querySelector('.contact_button');
  const closeModalButton = document.getElementById('close_modal');

  const elementsListened = [contactButton, closeModalButton];
  elementsListened.forEach((element) => {
    // eslint-disable-next-line
    element.addEventListener('click', toggleModal)
  });

  profileSection.prepend(profileCardDOM);
};

/**
 * Display the content of a photograph
 * @param photograph - the photograph object that contains the medias
 */
const displayPhotographContent = async (photograph) => {
  const photographMedias = document.querySelector('.photograph_medias');
  const { medias } = await getMedias(photograph);
  let tabIndex = 0;

  const filter = document.getElementById('filterSelector');
  let filterValue = filter.value;

  /* Sorting the medias array by likes and then it is adding the tabIndex to each media object. */
  medias.sort((a, b) => (b.likes - a.likes)).forEach(async (media) => {
    tabIndex = tabIndex + 1;

    media.photographerName = photograph.name;
    media.tabIndex = tabIndex;

    // eslint-disable-next-line no-undef
    const mediaModel = photographFactory(media);
    const mediaCardDOM = await mediaModel.getMediaCardDOM();
    photographMedias.appendChild(mediaCardDOM);
  });

  /* Updating the total likes of the photograph. */
  updateTotalLikes(medias, photograph.price);

  /* A callback function that is called when the value of the filter changes. */
  filter.addEventListener('change', (event) => {
    tabIndex = 0;
    filterValue = event.currentTarget.value;

    photographMedias.innerHTML = '';
    medias.sort((a, b) => filterValue === 'popularity' ? b.likes - a.likes : filterValue === 'date' ? new Date(b.date) - new Date(a.date) : filterValue === 'title' ? b.title < a.title : b > a)
      .forEach(async (media) => {
        tabIndex = tabIndex + 1;

        media.photographerName = photograph.name;
        media.tabIndex = tabIndex;

        // eslint-disable-next-line no-undef
        const mediaModel = photographFactory(media);
        const mediaCardDOM = await mediaModel.getMediaCardDOM();
        photographMedias.appendChild(mediaCardDOM);
      });
    updateTotalLikes(medias, photograph.price);
  });
};

/**
 * Update the total likes and the price of the photograph
 * @param medias - an array of media objects
 * @param price - the price of the photograph
 */
const updateTotalLikes = async (medias, price) => {
  let likes = 0;

  /* Adding the likes of each media to the total likes of the photograph. */
  medias.map((media) => (likes = likes + media.likes));

  const statsLikes = document.querySelector('.photograph_stats_likes');
  statsLikes.innerText = `${likes.toString()} \u2764`;
  const statsPrice = document.querySelector('.photograph_stats_price');
  statsPrice.innerText = `${price.toString()}€ / heure`;

  const mediasContainer = document.querySelector('.photograph_medias');
  /* Adding the event listener to the `photograph_medias` element. */
  mediasContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('photograph_media_informations_likes_button')) {
      likes = likes + 1;
      statsLikes.innerText = `${likes} \u2764`;
    }
    if (event.target.classList.contains('photograph_media_picture')) {
      const selectedMedia = event.target.parentNode.attributes.tabIndex.value - 1;
      // eslint-disable-next-line no-undef
      displayLightbox(medias, selectedMedia || 0);
    }
  });

  /* Adding an event listener to the `photograph_medias` element. */
  mediasContainer.addEventListener('keydown', (event) => {
    const keyPressed = event.key;
    /* Checking if the key pressed is the spacebar or the enter key. If it is, then it will get the
    tabIndex of the selected media and subtract 1 from it. Then it will display the lightbox with
    the selected media. */
    if (keyPressed === ' ' || keyPressed === 'Enter') {
      const selectedMedia = event.target.attributes.tabIndex.value - 1;
      // eslint-disable-next-line no-undef
      displayLightbox(medias, selectedMedia || 0);
    }
  });
}

/**
 * It gets the photograph from the database and displays the photograph content.
 */
const init = async () => {
  const photograph = await getPhotograph();
  document.title = `Fisheye - ${photograph.name}`;
  displayProfileData(photograph);
  displayPhotographContent(photograph);
}

init();
