// eslint-disable-next-line no-unused-vars
/**
 * It creates a photograph object.
 * @param data - The data that will be used to create the profile card and the media card.
 * @returns an object that contains the name of the photographer, the path to the profile picture, the
 * path to the media folder and the function to create the profile card.
 */
const photographFactory = (data) => {
  const { portrait } = data;
  const name = data.name ? data.name : data.photographerName;
  const photographerName = data.photographerName ? data.photographerName.split(' ')[0].replace('-', '') : null;
  const picture = `./assets/photographers/${portrait}`;
  const media = `./assets/medias/${photographerName}`;

  /**
   * Create a DOM element for the profile card and add it to the photograph header
   * @returns The DOM element that contains the profile card.
   */
  const getProfileCardDOM = () => {
    const profileHeader = document.querySelector('.photograph-header');

    const contactButton = document.querySelector('.contact_button');

    const profile = document.createElement('div');
    profile.classList.add('photograph_informations');

    const photographName = document.createElement('h1');
    photographName.classList.add('photograph_name');
    photographName.textContent = name;

    const photographLocation = document.createElement('p');
    photographLocation.classList.add('photograph_location');
    photographLocation.textContent = `${data.city}, ${data.country}`;

    const photographSlogan = document.createElement('p');
    photographSlogan.classList.add('photograph_slogan');
    photographSlogan.textContent = data.tagline;

    const photographPicture = document.createElement('img');
    photographPicture.setAttribute('src', picture);
    photographPicture.setAttribute('alt', name);
    photographPicture.classList.add('photograph_profile_picture');

    profileHeader.appendChild(profile);

    profile.appendChild(photographName);
    profile.appendChild(photographLocation);
    profile.appendChild(photographSlogan);

    profileHeader.appendChild(contactButton);

    profileHeader.appendChild(photographPicture);

    return profileHeader;
  }

  /**
   * Create the DOM for the media card
   */
  const getMediaCardDOM = () => {
    // Faire le DOM des medias.
    const article = document.createElement('article');
    article.classList.add('photograph_media');
    // article.setAttribute('tabIndex', `${data.tabIndex}`);

    const imageLink = document.createElement('button');
    imageLink.classList.add('photograph_media_button');
    imageLink.setAttribute('tabIndex', `${data.tabIndex}`);
    
    const image = document.createElement('img');
    image.setAttribute('alt', data.title);
    // eslint-disable-next-line no-unused-expressions
    data.image ? image.setAttribute('src', `${media}/${data.image}`) : null;
    image.classList.add('photograph_media_picture');

    const video = document.createElement('video');
    // eslint-disable-next-line no-unused-expressions
    video.setAttribute('alt', data.title);
    // eslint-disable-next-line no-unused-expressions
    data.video ? video.setAttribute('src', `${media}/${data.video}`) : null;
    video.classList.add('photograph_media_picture');

    const informations = document.createElement('div');
    informations.classList.add('photograph_media_informations');
    informations.setAttribute('aria-hidden', 'true');

    const title = document.createElement('p');
    title.classList.add('photograph_media_informations_title');
    title.innerText = data.title;

    const likes = document.createElement('div');
    likes.classList.add('photograph_media_informations_likes');

    const likesCounter = document.createElement('p');
    const likesCount = data.likes;
    likesCounter.classList.add('photograph_media_informations_likes_counter');
    likesCounter.innerText = likesCount;

    const likeButton = document.createElement('button');
    likeButton.classList.add('photograph_media_informations_likes_button');
    likeButton.innerText = '\u2764';
    likeButton.addEventListener('click', () => {
      // console.log(likesCount)
      // data.likes === likesCount ?
      //     (data.likes = data.likes + 1,
      //         likesCounter.innerText = data.likes)
      //     : data.likes === likesCount + 1 ?
      //         (data.likes = data.likes - 1,
      //             likesCounter.innerText = likesCount)
      //         : likesCounter.innerText = data.likes
      data.likes = data.likes + 1;
      likesCounter.innerText = data.likes;
    });

    article.appendChild(imageLink);

    imageLink.appendChild(data.image ? image : video);

    article.appendChild(informations);
    informations.appendChild(title);
    informations.appendChild(likes);

    likes.appendChild(likesCounter);
    likes.appendChild(likeButton);

    return article;
  }

  return { name, picture, media, getProfileCardDOM, getMediaCardDOM };
};
