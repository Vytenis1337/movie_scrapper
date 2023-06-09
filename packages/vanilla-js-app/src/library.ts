const libraryList = document.querySelector('.library-list');

const currentUserId = JSON.parse(localStorage.getItem('currentUserId') as any);

export const fetchLibrary = () => {
    fetch(`http://localhost:8000/api/library?userId=${currentUserId}`)
        .then((response: { json: () => any }) => response.json())
        .then(
            (items: {
                forEach: (arg0: (item: { movieId: number; posterUrl: string; title: string }) => void) => void;
            }) => {
                // Clear existing list items
                libraryList.innerHTML = '';
                console.log(items);

                // Iterate through the items and create list elements
                items?.forEach((item: { _id: any; movieId: number; posterUrl: string; title: string }) => {
                    // Create list item container
                    const libraryCard = document.createElement('div');
                    libraryCard.classList.add('library-card');

                    // Create image element
                    const libraryImg = document.createElement('img');
                    libraryImg.src = item.posterUrl; // Assuming each item has an "imageUrl" property
                    libraryCard.appendChild(libraryImg);
                    libraryImg.classList.add('library-img');

                    const libraryButton = document.createElement('button');
                    libraryButton.classList.add('library-button');

                    // Create anchor tag
                    const anchor = document.createElement('a');
                    anchor.href = `/src/movie.html?movieId=${item._id}`; // Assuming each item has a "movieId" property
                    anchor.textContent = item.title; // Assuming each item has a "title" property

                    // Append anchor tag to the button
                    libraryButton.appendChild(anchor);

                    // Append button to the list item
                    libraryCard.appendChild(libraryButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('library-delete');
                    deleteButton.textContent = 'Delete';
                    libraryCard.appendChild(deleteButton);

                    // Add event listener to the button
                    deleteButton.addEventListener('click', deleteLibraryItem);

                    // Event listener function
                    function deleteLibraryItem() {
                        // Make the DELETE request using fetch
                        fetch(`http://localhost:8000/api/library/${item._id}`, {
                            method: 'DELETE',
                        })
                            .then((response) => {
                                if (response.ok) {
                                    console.log('Data deleted successfully');
                                    fetchLibrary();
                                } else {
                                    console.error('Error deleting data');
                                }
                            })
                            .catch((error) => {
                                console.error('Error deleting data:', error);
                            });
                    }

                    // Append list item to the list
                    libraryList.appendChild(libraryCard);
                });
            }
        )
        .catch((error: any) => {
            console.error('Error:', error);
        });
};

fetchLibrary();
