$(() => {
    // Function to close Bulma notifications
    $(document).on("click", ".notification > .delete", function() {
        // callback must be "function()" not "() =>" because we need access to "this"
        $(this).parent().remove();
    });

    $(".searchDiv").on("click", ".button", (event) => {
        event.preventDefault();

        const skill = $("#skillSearch").val().trim();

        $.ajax({
            method: "GET",
            url: "/api/skills/" + skill,
        }).then((res) => {
            console.log(res);
        });
    });
});