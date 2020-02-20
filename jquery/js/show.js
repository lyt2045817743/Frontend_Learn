$.fn.extend({
    fellow: function(){
        $(this).append(
            '<button id="btn">登陆</button>' +
            '<div class="modal-bar">' +
            '<div id="box">' +
            '<div id="up">' +
            '登陆' +
            '<span id="right">X</span>' +
            '</div>' +
            '<div id="down">' +
            '登陆' +
            '</div>' +
            '</div>' +
            '</div>'
        )

        $("#btn").on("click", function () {
            $(".modal-bar").addClass("active");
        })
        $("#right").on("click", function () {
            $(".modal-bar").removeClass("active");
        })
    }

})