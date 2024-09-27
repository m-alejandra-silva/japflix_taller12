let movies = [];
const lista = document.getElementById('lista');

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(response => movies = response)
    .catch(error => console.error('Error fetching the movies:', error));
});

document.getElementById('btnBuscar').addEventListener('click', () => {

    const inputBuscar = document.getElementById('inputBuscar').value.toLowerCase();
    lista.innerHTML = '';

    if (inputBuscar) {
        const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(inputBuscar) ||
            movie.genres.some(genre => genre.name.toLowerCase().includes(inputBuscar)) ||
            movie.tagline.toLowerCase().includes(inputBuscar) ||
            movie.overview.toLowerCase().includes(inputBuscar)
        );

        filteredMovies.forEach(movie => {
            lista.innerHTML += `
                <li class="list-group-item bg-dark text-light">
                    <h5>${movie.title}</h5>
                    <p>${movie.tagline}</p>
                    ${starRating(movie.vote_average)}
                </li>
            `;
        });        
    }
});

function starRating(vote) {
    const maxStars = 5;
    const stars = Math.round(vote / 2);
    let starHtml = '';

    for (let i = 1; i <= maxStars; i++) {
        starHtml += i <= stars ? '<span class="fa fa-star checked"></span>' : '<span class="fa fa-star"></span>';
    }
    return starHtml;
}

lista.addEventListener('click', (event) => {
    const movieTitle = event.target.closest('.list-group-item');
    
    if (movieTitle) {
        const movie = movies.find(m => m.title === movieTitle.querySelector('h5').textContent);
        
        if (movie) {
      
            document.getElementById('movieTitle').textContent = movie.title;
            document.getElementById('movieOverview').textContent = movie.overview;
            document.getElementById('movieGenres').textContent = movie.genres.map(genre => genre.name).join(' - ');
            document.getElementById('movieReleaseYear').textContent = `Year: ${movie.release_date.split('-')[0]}`;
            document.getElementById('movieDuration').textContent = `Runtime: ${movie.runtime} minutos`;
            document.getElementById('movieBudget').textContent = `Budget: $${movie.budget}`;
            document.getElementById('movieRevenue').textContent = `Revenue: $${movie.revenue}`;
            
            const offcanvas = new bootstrap.Offcanvas(document.getElementById('movieDetails'));
            offcanvas.show();
        }
    }
});



