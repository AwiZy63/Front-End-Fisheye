// eslint-disable-next-line no-unused-vars
let count = 1;
/**
 * It creates a photographer object.
 * @param data - the data that will be used to create the photographer
 * @returns A function that returns an object with the following properties:
 * - name
 * - picture
 * - getUserCardDOM
 */
const photographerFactory = (data) => {
  const { name, portrait, tagline, city, country, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  /**
   * It creates a DOM element for a photographer card.
   * @returns an article element.
   */
  const getUserCardDOM = () => {
    count = count + 1;

    const article = document.createElement('article');
    article.setAttribute('aria-label', `Carte de ${name},.`);
    // article.setAttribute('role', 'main');
    
    const link = document.createElement('a');
    link.setAttribute('href', `photographer.html?id=${id}`);
    link.setAttribute('role', 'banner');
    link.setAttribute('aria-label', `Lien vers la page de ${name},.`);
    link.setAttribute('tabindex', count);

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `Photo de ${name},.`);
    img.setAttribute('role', 'img');
    img.setAttribute('aria-describedBy', `picture`);

    const h2 = document.createElement('h2');
    h2.setAttribute('aria-label', "Le nom du photographe est,");
    h2.textContent = name;

    const locationElement = document.createElement('p');
    locationElement.setAttribute('aria-label', `Lieu,`);
    locationElement.textContent = `${city}, ${country}`;
    locationElement.classList.add('photographer_location');

    const descriptionElement = document.createElement('p');
    descriptionElement.setAttribute('aria-label', `Son slogan,`);
    descriptionElement.textContent = tagline;
    descriptionElement.classList.add('photographer_description');

    const priceElement = document.createElement('p');
    priceElement.textContent = `${price}€/heure`;
    priceElement.classList.add('photographer_price');
    priceElement.setAttribute('aria-label', `Son prix est de,`);

    article.appendChild(link);

    link.appendChild(img);
    link.appendChild(h2);
    link.appendChild(locationElement);

    article.appendChild(descriptionElement);
    article.appendChild(priceElement);

    return (article);
  }
  return { name, picture, getUserCardDOM };
};
