//TMDB
const apiKey='api_key=5fe970e05084b10c3a5635e9e19b3fe7';
const baseUrl= 'https://api.themoviedb.org/3';
const apiUrl= baseUrl + '/discover/movie?with_genres=18&primary_release_year=2014&' + apiKey;
const imageUrl= 'https://image.tmdb.org/t/p/w500';
const searchUrl= baseUrl + '/search/movie?' + apiKey;
const main= document.getElementById('main');
const form = document.getElementById('form');
const search= document.getElementById('search');


getMovies(apiUrl);

function getMovies(url){

   fetch(url).then(res => res.json()).then(data => { 
     console.log(data.results);
       showMovies(data.results) ;

       
       
       
})
}

function showMovies(data){

main.innerHTML='';
   data.forEach(
     (movie) => {
           const{title,poster_path,vote_average,overview,release_date, genre_ids,popularity}= movie;
           const movieEl= document.createElement('div');
           movieEl.classList.add('movie');
           movieEl.innerHTML=`
           <img src="${imageUrl + poster_path}"   alt="${title}">
           
   
           <div class="movie-info">
           
               <h3>${title}</h3>
               <span class="${getColor(vote_average)}">${vote_average}</span>
           </div>
   
           
           <h3 class="overview">overview</h3>
           <div class="overview">
               ${overview}
           </div>
       `

       main.appendChild(movieEl);

       }
   )
}

function getColor(vote){
   if(vote >= 6.8){
       return'green'
   }else if (vote >= 5 ) {
   return 'orange'
   } else{
       return'red'
   }
}


form.addEventListener('submit', (e) => {
   e.preventDefault();

   const searchTerm = search.value;

   if(searchTerm){
       getMovies(searchUrl + '&query=' + searchTerm)
   }else{
       getMovies(apiUrl);
   }
})