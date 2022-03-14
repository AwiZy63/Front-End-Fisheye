// eslint-disable-next-line no-unused-vars
function photographerFactory (data) {
  const { name, portrait, tagline, city, country, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM () {
    const article = document.createElement('article');
    const link = document.createElement('a');
    link.setAttribute('href', `photographer.html?id=${id}`);
    //  link.setAttribute("aria-label", `Lien de redirection vers le profil de ${name}`);

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    //  img.setAttribute("aria-disabled", "true");

    const h2 = document.createElement('h2');
    h2.textContent = name;
    //  h2.setAttribute('aria-label', `Le nom du photographe est ${name}`);

    const locationElement = document.createElement('p');
    locationElement.textContent = `${city}, ${country}`;
    locationElement.classList.add('photographer_location');
    //  locationElement.setAttribute('aria-label', `${city}, ${country}`)

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = tagline;
    descriptionElement.classList.add('photographer_description');
    //  descriptionElement.setAttribute('aria-label', `Slogan de ${name}, ${tagline}`)

    const priceElement = document.createElement('p');
    priceElement.textContent = `${price}€/jour`;
    priceElement.classList.add('photographer_price');
    //  priceElement.setAttribute('aria-label', `Son prix est de ${price} par jour`)

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
