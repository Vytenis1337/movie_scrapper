import { signInWithEmailAndPassword } from 'firebase/auth';

const itemList = document.querySelector('.item-list');
const categoryList = document.querySelector('.category-list');
const searchInput: any = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

function fetchItemsByGenre(category: string) {
    fetch(`http://localhost:8000/api/movies?genres=${category}`)
        .then((response) => response.json())
        .then((items) => {
            itemList.innerHTML = '';
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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export const fetchMovies = () => {
    fetch('http://localhost:8000/api/movies')
        .then((response: { json: () => any }) => response.json())
        .then(
            (items: {
                map(arg0: (item: { genres: string[] }) => any): Iterable<unknown>;
                forEach: (arg0: (item: { movieId: number; posterUrl: string; title: string }) => void) => void;
            }) => {
                const categories: any = [...new Set(items?.map((item: { genres: any }) => item.genres))];

                const uniqueCategories: any = [...new Set(categories?.flat())];

                uniqueCategories?.forEach((category: string) => {
                    const categoryButton = document.createElement('button');
                    categoryButton.textContent = category;
                    categoryButton.classList.add('categories-button');
                    categoryButton.addEventListener('click', () => {
                        fetchItemsByGenre(category);
                    });
                    categoryList.appendChild(categoryButton);
                });

                searchButton?.addEventListener('click', () => {
                    const searchValue = searchInput?.value;

                    // Construct the URL for fetching movie data
                    const apiUrl = `http://localhost:8000/api/movies?search=${searchValue}`;

                    // Fetch the movie data
                    fetch(apiUrl)
                        .then((response) => response.json())
                        .then((items) => {
                            // Process the movie data
                            itemList.innerHTML = '';

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

                            // You can display the movies on the page or perform any other operations here
                        })
                        .catch(function (error) {
                            console.log('An error occurred:', error);
                        });
                });

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

fetchMovies();
