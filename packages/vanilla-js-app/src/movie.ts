const movieDetails = document.querySelector('.movie-details');
const libraryButton = document.querySelector('.library-button');
// Get the movieId from the URL query parameters
const urlParams = new URLSearchParams(window?.location?.search);
const movieId = urlParams.get('movieId');

const openModal = document.querySelector('.open-modal');
const modal = document.getElementById('myModal');

// Get the video player element
const videoPlayer: any = document.getElementById('videoPlayer');

console.log(movieId);

const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
const currentUserId = JSON.parse(localStorage.getItem('currentUserId') as any);

// Fetch movie details based on the movieId
function fetchSingleMovie() {
    fetch(`http://localhost:8000/api/movies/${movieId}`)
        .then((response) => response.json())
        .then((movie) => {
            movieDetails.innerHTML = '';
            // Display the movie details on the page

            const movieTitle = document.createElement('h2');
            movieTitle.classList.add('single-h1');
            movieTitle.textContent = movie.title;
            movieDetails.appendChild(movieTitle);

            const movieImage = document.createElement('img');
            movieImage.src = movie.posterUrl;
            movieImage.title = movie.title;
            movieImage.classList.add('single-img');
            movieDetails.appendChild(movieImage);

            const movieRating = document.createElement('p');
            movieRating.classList.add('single-summary');
            movieRating.textContent = `Movie Rating: ${movie.rating}`;
            movieDetails.appendChild(movieRating);

            const movieYear = document.createElement('div');
            movieYear.classList.add('single-release');
            movieYear.textContent = `Release Year: ${movie.year}`;
            movieDetails.appendChild(movieYear);

            const movieSummary = document.createElement('p');
            movieSummary.classList.add('single-summary');
            movieSummary.textContent = movie.summary;
            movieDetails.appendChild(movieSummary);

            const handlePostButtonClick = () => {
                const payload = {
                    userId: currentUserId,
                    year: movie.year,
                    rating: movie.rating,
                    title: movie.title,
                    summary: movie.summary,
                    posterUrl: movie.posterUrl,
                    movieId: movie.movieId,
                    genres: movie.genres,
                    videoUrl: movie.videoUrl,
                    _id: movie._id,
                };

                fetch('http://localhost:8000/api/library', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Post response:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            };

            // Add event listener to the button

            libraryButton.addEventListener('click', handlePostButtonClick);

            openModal.addEventListener('click', () => {
                // Set the video URL
                const videoUrl = movie.videoUrl; // Replace with your video URL

                // Set the video URL as the source of the video player
                videoPlayer.src = videoUrl;

                // Show the modal
                modal.style.display = 'block';

                // Function to close the modal
                function closeModal() {
                    // Hide the modal
                    modal.style.display = 'none';

                    // Pause the video when the modal is closed
                    videoPlayer.pause();
                }

                // Close the modal when the user clicks outside of it
                window.onclick = function (event) {
                    if (event.target === modal) {
                        closeModal();
                    }
                };
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

fetchSingleMovie();
