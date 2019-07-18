$(document).ready(function () {
    console.log("ready!");
    var characters = ["Stewie Griffin", "Sponge Bob", "Rick Sanchez", "Mr. Peanutbutter"];

    function showsGif() {

        var character = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            character + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var result = response.data;

            for (var i = 0; i < result.length; i++) {
                var gifDiv = $("<div>");
                var characterGif = $("<img>").attr("src", result[i].images.fixed_height_still.url);
                gifDiv.prepend(characterGif);
                $("#gif-view").prepend(gifDiv);

                characterGif.attr("class", "characterGif");
                characterGif.attr("data-state", "still")
                characterGif.attr("data-stillUrl", result[i].images.fixed_height_still.url);
                characterGif.attr("data-animateUrl", result[i].images.fixed_height.url);


                $(".characterGif").on("click", function () {

                    var state = $(this).attr("data-state")

                    if (state === "still") {
                        console.log(this);
                        $(this).attr("data-state", "animate");
                        $(this).attr("src", $(this).attr("data-animateUrl"))

                    }
                    else if (state === "animate") {
                        console.log(this);
                        $(this).attr("data-state", "still");
                        $(this).attr("src", $(this).attr("data-stillUrl"))
                    }

                });

            }

        });

    }


    function createButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < characters.length; i++) {

            var btn = $("<button>");
            btn.addClass("gif-btn btn btn-dark mr-1 mb-2");
            btn.attr("data-name", characters[i]);
            btn.text(characters[i]);
            $("#buttons-view").append(btn);
        }
    }

    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var character = $("#gif-input").val().trim();
        characters.push(character);
        createButtons();
        $("#gif-input").val("");
    });

    $(document).on("click", ".gif-btn", showsGif);
    createButtons();


});