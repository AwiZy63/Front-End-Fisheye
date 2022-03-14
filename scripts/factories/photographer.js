function photographerFactory(data) {
    const { name, portrait, tagline, city, country, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        link.setAttribute("href", `photographer.html?id=${id}`);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const locationElement = document.createElement( "p" );
        locationElement.textContent = `${city}, ${country}`;
        locationElement.classList.add('photographer_location');

        const descriptionElement = document.createElement( "p" );
        descriptionElement.textContent = tagline;
        descriptionElement.classList.add("photographer_description");

        const priceElement = document.createElement( "p" );
        priceElement.textContent = `${price}€/jour`;
        priceElement.classList.add('photographer_price');

        article.appendChild(link);

        link.appendChild(img);
        link.appendChild(h2);
        link.appendChild(locationElement);

        article.appendChild(descriptionElement);
        article.appendChild(priceElement);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}