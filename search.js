$(function () {
   //var key = a7596118b5e3119c33ea4873f0282164;
   var base_url = "http://image.tmdb.org/t/p/";
   var poster_size = "w154";
    
    $('#submit').click(function(){
       var query = $('#inpval').val();
       var url = 'https://api.themoviedb.org/3/search/movie?api_key=a7596118b5e3119c33ea4873f0282164&language=en-US&query=' + query + '&page=1&include_adult=true';
       var encoded = url.replace(/ /g, "%20");
       console.log(encoded);
       
       search_render(encoded);
   }); 
    document.getElementById('inpval').addEventListener('keyup',function (event) {
        event.preventDefault();
        if(event.keyCode==13){
            document.getElementById('submit').click();
        }
    });
    
   function search_render(my_url) {
       $('#output').html('<div id="details"><p id="title"></p><p id="rating">Rating: </p><p id = "genre" class="left">Genre: </p><p id = "overview" class="left">Overview: </p><p id="date" class="left">Release Date: </p> </div>');
       $.ajax({url : my_url , success : function(result) {
           console.log("hello");
           console.log(result);
           $('#title').append(result.results[0].title);
           $('#rating').append(result.results[0].vote_average);
           $('#overview').append('<br>' + result.results[0].overview);
           $('#output').prepend('<img src = "' + base_url + poster_size + result.results[0].poster_path + '">');
           $('#output').css('opacity' , '1');
           var details_url = 'https://api.themoviedb.org/3/movie/' + result.results[0].id + '?api_key=a7596118b5e3119c33ea4873f0282164&language=en-US';
           $.ajax({url : details_url , success : function (result) {
               $('#genre').append(result.genres[0].name);
               $('#date').append(result.release_date);
               
               
           }});
           
           var sim_url = 'https://api.themoviedb.org/3/movie/' + result.results[0].id+'/similar?api_key=a7596118b5e3119c33ea4873f0282164&language=en-US&page=1'
           $.ajax({url : sim_url , success : function(result) {
               console.log("similar");
               console.log(result);
               $('#similar').html("<h1>Similar Movies</h1>");
               for(var i = 0; i<4; i++)
                   {
                       $('#similar').append('<div class="movie_box" id = "movie' + i + '"> <div class = "inner_box" id = "inner' + i + '"> <p class = "rate" id="simrating' + i + '"></p> </div> </div>');
            var id = '#movie' + i;
             $(id).css({'background-image' : 'url(' + base_url + poster_size + result.results[i].poster_path + ')' , 
                       'backgound-size' : 'cover'});
            id = "#inner" + i; 
            $(id).append('<li>'+ result.results[i].original_title + '</li>');
            id = "#simrating" + i;
            $(id).append(result.results[i].vote_average + '/10'); 
                   }
           }
           });
       }});
   }
});