$(function () {
    var id_s = [] , ids = [];
    var base_url = "http://image.tmdb.org/t/p/";
    var poster_size = "w154";
    var x = 0;
    
    id_s = JSON.parse(localStorage.getItem('mymovies'));
    if(id_s !== null)
        ids = id_s;
    
    for(j=ids.length - 1 ; j > ids.length-5; j--)
        {
            //console.log("j = " + j);
            if(j<0)
                break;
            //console.log(ids[j]);
            var idurl = 'https://api.themoviedb.org/3/movie/' + ids[j] + '/recommendations?api_key=a7596118b5e3119c33ea4873f0282164&language=en-US&page=1';
            
            $.ajax({url : idurl , success : function(result) {
                //console.log(result);
                for(var i = x; i < x + 4 ; i++)
                    {
                        $('#output').append('<div class="movie_box" id = "movie' + i + '"> <div class = "inner_box" id = "inner' + i + '"> <p class = "rate" id="rating' + i + '"></p> </div> </div>');
                        var id = '#movie' + i;
                        
             $(id).css({'background-image' : 'url(' + base_url + poster_size + result.results[i-x].poster_path + ')' , 'backgound-size' : 'cover'});
             
             id = "#inner" + i; 
             $(id).append('<li>'+ result.results[i-x].original_title + '</li>');
            
             id = "#rating" + i;
             $(id).append(result.results[i-x].vote_average + '/10'); 
                    }
                
                x = x + 4;
                
            }
                    
        })
    }
});