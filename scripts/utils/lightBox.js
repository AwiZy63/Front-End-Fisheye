// eslint-disable-next-line no-unused-vars
const lightBoxCloseButton = document.getElementById('closeLightbox');
const lightBox = document.getElementById('lightbox');
let handleKeyboard;


/**
 * Hide the lightbox by removing the event listener and setting the display to none
 */
const hideLightbox = () => {
  document.removeEventListener('keydown', handleKeyboard);
  lightBox.style.display = 'none';
}

/**
 * Display a lightbox with the selected media
 * @param medias - An array of media objects.
 * @param selectedMedia - The index of the media to display.
 */
const displayLightbox = async (medias, selectedMedia) => {
  lightBox.style.display = 'flex';

  const leftArrow = document.getElementById('leftArrow');
  const rightArrow = document.getElementById('rightArrow');

  let count = selectedMedia;
  let media = medias[count];

  // eslint-disable-next-line no-undef
  const { name } = await getPhotograph(media.photographerId);

  const photographName = name.split(' ')[0].replace('-', '');

  const mediaSource = `./assets/medias/${photographName}/${media.image ? media.image : media.video}`;
  const mediaType = media.image ? 'img' : 'video';
  const mediaTitle = document.querySelector('.lightbox-content-title');
  mediaTitle.innerText = media.title;

  const mediaTemplate = document.querySelector('.lightbox-content-media');
  const mediaElement = document.createElement(mediaType === 'video' ? 'video' : 'img');

  mediaElement.setAttribute('src', mediaSource);
  mediaElement.setAttribute('alt', media.title);

  if (mediaType === 'video') {
    mediaElement.setAttribute('controls', '');
    mediaElement.setAttribute('autoplay', '');
    mediaElement.setAttribute('muted', '');
    mediaElement.setAttribute('loop', '');
    mediaElement.setAttribute('type', 'video/mp4');
  }

  mediaElement.classList.add('lightbox-content-media');

  mediaTemplate.replaceWith(mediaElement);

  /**
   * Update the media in the lightbox
   * @param media - The media object to be displayed.
   */
  const updateMedia = (media) => {
    const mediaContainer = document.getElementById('lightboxMediaContainer');

    const newMediaSource = `./assets/medias/${photographName}/${media.image ? media.image : media.video}`;

    mediaTitle.innerText = media.title;

    if (media.image) {
      mediaContainer.innerHTML = `<img class="lightbox-content-media" src="${newMediaSource}" alt="${media.title}" />`;
    } else {
      mediaContainer.innerHTML = `<video class="lightbox-content-media" src="${newMediaSource}" alt="${media.title}" controls="" autoplay="" muted="" loop="" type="video/mp4"></video>`;
    }
  }

  /**
   * * Decrement the count variable by 1. 
   * * Set the media variable to the media at the new count index. 
   * * If the media variable is undefined, set it to the last media in the medias array. 
   * * Update the media in the UI
   */
  const previousMedia = () => {
    count = count - 1;
    media = medias[count];

    if (!media) {
      count = medias.length - 1;
      media = medias[count];
    }

    updateMedia(media);
  }
  
  /**
   * `nextMedia()` is a function that takes no arguments and returns no value. 
   * called by the `next` button on the page. 
   * It takes the current media and increments the count by 1. 
   * If the count is greater than the number of medias, it resets the count to 0. 
   * It then updates the media to the next media in the list.
   */
  const nextMedia = () => {
    count = count + 1;
    media = medias[count];

    if (!media) {
      count = 0;
      media = medias[count];
    }

    updateMedia(media);
  }

  if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', previousMedia);
    rightArrow.addEventListener('click', nextMedia);
  }

  /* This is the event listener for the keyboard. 
  called when the user presses a key. 
  It takes the event as an argument and checks if the key pressed is the right or left arrow. 
  If it is, it calls the `previousMedia()` or `nextMedia()` function. 
  If the key pressed is the escape key, it calls the `hideLightbox()` function. */
  handleKeyboard = (event) => {
    const key = event.key;
    if (key === 'ArrowRight') {
      rightArrow.focus();
      nextMedia();
    } else if (key === 'ArrowLeft') {
      previousMedia();
      leftArrow.focus();
    } else if (key === 'Escape') {
      lightBoxCloseButton.focus();
      hideLightbox();
    }
  };

  document.addEventListener('keydown', handleKeyboard);
}

lightBoxCloseButton.addEventListener('click', hideLightbox);
