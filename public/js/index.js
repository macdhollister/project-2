$(() => {
    const socket = io();

    $("#chat").submit(e => {
        e.preventDefault(); // prevents page reloading
        socket.emit("chat message", {
            msg: $("#message").val(),
            sender: $("#senderU").text()
        });
        $("#message").val("");
        return false;
    });

    socket.on("chat message", cm => {
        if (cm.sender === $("#senderU").text()) {
            $("#chathistory").append(`<li class="sender box"><p><strong>${cm.sender}</strong></p> ${cm.msg}`);
        } else {
            $("#chathistory").append(`<li class="receiver box"><p><strong>${cm.sender}</strong></p> ${cm.msg}`);
        }
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