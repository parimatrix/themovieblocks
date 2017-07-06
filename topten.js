$(function () {
    var top_ten_url = "https://api.themoviedb.org/3/discover/movie?api_key=a7596118b5e3119c33ea4873f0282164&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1";
    
    var base_url = "http://image.tmdb.org/t/p/";
    var poster_size = "w154";
    var ids = [];
    
    /*var i = 1;
    for(i=0;i<20;i++)
     $('#output').append('<div class="movie_box" id = "movie' + i + '"> <div class = "inner_box" id = "inner' + i + '"> <p id="rating' + i + '"></p> </div> </div>');
    */
    function render() {
     $.ajax({url : top_ten_url , success : function(result) {
         $('#output').html('');
        console.log("hello");
        console.log(result);
        for(var i = 0; i<20;i++)
         {
            $('#output').append('<div class="movie_box" id = "movie' + i + '"> <div class = "inner_box" id = "inner' + i + '"> <p class = "rate" id="rating' + i + '"></p> </div> </div>');
            var id = '#movie' + i;
             $(id).css({'background-image' : 'url(' + base_url + poster_size + result.results[i].poster_path + ')' , 
                       'backgound-size' : 'cover'});
            id = "#inner" + i; 
            $(id).append('<li>'+ result.results[i].original_title + '</li>');
            $(id).append('<br><i id="icon'+i+'" style="font-size: 30px" class="fa fa-heart myicon" aria-hidden="true"></i>'); 
            id = "#rating" + i;
            $(id).append(result.results[i].vote_average + '/10'); 
            //$('#output').append('<li>' + result.results[i].original_title + '</li> </div>');
            //$('#output').append('<img src = "' + base_url + poster_size + result.results[i].poster_path + '">');
               
         }
         $('.myicon').click(function() {
             var rec_id = this.id;
             this.style.color = "#F63025";
             var id_s = JSON.parse(localStorage.getItem("mymovies"));
             if(id_s !== null)
                 ids = id_s;
             rec_id = parseInt(rec_id.replace('icon' , ''));
             ids.push(result.results[rec_id].id);
             localStorage.setItem('mymovies' , JSON.stringify(ids));
         });
    }});
    };
    render();
    
    $('#page2').click(function(){
        top_ten_url = "https://api.themoviedb.org/3/discover/movie?api_key=a7596118b5e3119c33ea4873f0282164&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=2";
        render();
    });
    $('#page3').click(function(){
        top_ten_url = "https://api.themoviedb.org/3/discover/movie?api_key=a7596118b5e3119c33ea4873f0282164&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=3";
        render();
    });
    $('#page1').click(function(){
        top_ten_url = "https://api.themoviedb.org/3/discover/movie?api_key=a7596118b5e3119c33ea4873f0282164&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1";
        render();
    });
    
});