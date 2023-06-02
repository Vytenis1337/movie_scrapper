const itemList = document.querySelector('.itemList');

export const fetchMovies = () => {
    fetch('http://localhost:8000/api/movies')
        .then((response: { json: () => any }) => response.json())
        .then(
            (items: {
                forEach: (arg0: (item: { movieId: number; posterUrl: string; title: string }) => void) => void;
            }) => {
                // Clear existing list items
                itemList.innerHTML = '';
                console.log(items);

                // Iterate through the items and create list elements
                items.forEach((item: { _id: any; movieId: number; posterUrl: string; title: string }) => {
                    // Create list item container
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movie-card');
                    const button = document.createElement('button');

                    // Create anchor tag
                    const anchor = document.createElement('a');
                    anchor.href = `/src/movie.html?movieId=${item._id}`; // Assuming each item has a "movieId" property
                    anchor.textContent = item.title; // Assuming each item has a "title" property

                    // Append anchor tag to the button
                    button.appendChild(anchor);

                    // Append button to the list item
                    movieCard.appendChild(button);

                    // Create image element
                    const movieImg = document.createElement('img');
                    movieImg.src = item.posterUrl; // Assuming each item has an "imageUrl" property
                    movieCard.appendChild(movieImg);
                    movieImg.classList.add('movie-img');

                    // Create title element
                    const title = document.createElement('span');
                    title.textContent = item.title; // Assuming each item has a "title" property
                    movieCard.appendChild(title);

                    // Append list item to the list
                    itemList.appendChild(movieCard);
                });
            }
        )
        .catch((error: any) => {
            console.error('Error:', error);
        });
};
