/**
 * es6 modules and imports
 */
const $ = require('jquery');
var editIDNum = 0;
import sayHello from './hello';

sayHello('World');

const {getMovies, getMovie, addMovie, deleteMovie, editMovie,} = require('./api.js');

function refreshMovies() {
    getMovies().then((movies) => {
        $('.movies').html('');

        movies.forEach(({title, rating, id}) => {
            $('.movies').append(`<ul class="delete">
<li>Title: ${title}, Rating: ${rating}, Id:${id} </li><button value="${id}" class="delete">Delete</button>
</ul> `);
            $('.movies').append(`<div class="edit"><button type="button" value="${id}" class="formButton">Edit</button></div><hr>`);
        });


        $(".formButton").click(function(event) {

            editIDNum = $(event.target).val();
            getMovie(editIDNum).then((movie) => {
                $('#editTitle').val(movie.title);
                $('#editRating').val(movie.rating);
                $('#editGenre').val("");
                $("#form1").toggle();
            });


        });
    })
        .catch((error) => {
        });


    $('.movies').on('click', '.delete', function (event){
        let deleteId = $(event.target).val();
        deleteMovie(deleteId);
        refreshMovies();
    });

    // $('.movies').on('click', '.edit', function (event) {
    //     let editId = $(event.target).val();
    //     editMovie(editId);
    //     refreshMovies();
    // });


}

$('#addMovie').click(() => {
    let title = $('#inputTitle').val();
    let rating = $('#inputRating').val();
    let genre = $('#inputGenre').val();
    // look up inputs
    addMovie(title, rating, genre);
});
//
//     $('#editMovie').click(() => {
//     let title = $('#editTitle').val();
//     let rating = $('#editRating').val();
//     let genre = $('#editGenre').val();
//     // look up inputs
//     editMovie(title, rating, genre);
// });
//

// const targetID = ${this.id}

$('#editMovie').click(() => {
//$('.movies').on('click', '.edit', function (event){
    let editId = editIDNum;
    console.log("This", editId);
    const editTitle = $('#editTitle').val();
    const editRating = $('#editRating').val();

    let title = editTitle;
    let rating = editRating;
    // look up inputs

    editMovie(editId, title, rating);
    editIDNum = 0;
    $("#form1").toggle();
    refreshMovies();
});




refreshMovies();

// loader------------------------------
$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
$(window).on('load', function () {
    setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});

function removeLoader() {
    $("#loadingDiv").fadeOut(500, function () {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight
    });
}
