$(() => {
    const socket = io();

    $("#chat").submit(e => {
        e.preventDefault(); // prevents page reloading
        socket.emit("chat message", $("#message").val());
        $("#message").val("");
        return false;
    });

    socket.on("chat message", msg => {
        $("#chathistory").append($("<li class='sender'>").text(msg));
    });

    // Function to close Bulma notifications
    $(document).on("click", ".notification > .delete", function () {
        // callback must be "function()" not "() =>" because we need access to "this"
        $(this).parent().remove();
    });

    $(".burger").on("click", () => {
        console.log("clicked");
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

});