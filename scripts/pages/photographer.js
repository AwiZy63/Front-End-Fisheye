// Mettre le code JavaScript lié à la page photographer.html
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

const getMedias = async (photograph) => {
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  const medias = data.media.filter(media => media.photographerId === photograph.id);

  return ({
    medias: [...medias]
  });
};

const displayProfileData = async (photograph) => {
  const profileSection = document.querySelector('.photograph_page');
  // eslint-disable-next-line no-undef
  const photographModel = photographFactory(photograph);
  const profileCardDOM = photographModel.getProfileCardDOM();

  const contactButton = document.querySelector('.contact_button');
  const closeModalButton = document.getElementById('close_modal');

  const elementsListened = [contactButton, closeModalButton];
  elementsListened.forEach((element) => {
    element.addEventListener('click', toggleModal)
  });

  profileSection.prepend(profileCardDOM);
};

const displayPhotographContent = async (photograph) => {
  const photographMedias = document.querySelector('.photograph_medias');
  const { medias } = await getMedias(photograph);
  let tabIndex = 0;

  const filter = document.getElementById('filterSelector');
  let filterValue = filter.value;

  medias.sort((a, b) => (b.likes - a.likes)).forEach(async (media) => {
    tabIndex = tabIndex + 1;

    media.photographerName = photograph.name;
    media.tabIndex = tabIndex;

    // eslint-disable-next-line no-undef
    const mediaModel = photographFactory(media);
    const mediaCardDOM = await mediaModel.getMediaCardDOM();
    photographMedias.appendChild(mediaCardDOM);
  });

  updateTotalLikes(medias, photograph.price);

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

const updateTotalLikes = async (medias, price) => {
  let likes = 0;

  medias.map((media) => (likes = likes + media.likes));

  const statsLikes = document.querySelector('.photograph_stats_likes');
  statsLikes.innerText = `${likes.toString()} \u2764`;
  const statsPrice = document.querySelector('.photograph_stats_price');
  statsPrice.innerText = `${price.toString()}€ / heure`;

  const mediasContainer = document.querySelector('.photograph_medias');
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

  mediasContainer.addEventListener('keydown', (event) => {
    const keyPressed = event.key;
    if (keyPressed === ' ' || keyPressed === 'Enter') {
      const selectedMedia = e.target.attributes.tabIndex.value - 1;
      // eslint-disable-next-line no-undef
      displayLightbox(medias, selectedMedia || 0);
    }
  });
}

const init = async () => {
  const photograph = await getPhotograph();
  document.title = `Fisheye - ${photograph.name}`;
  displayProfileData(photograph);
  displayPhotographContent(photograph);
}

init();
