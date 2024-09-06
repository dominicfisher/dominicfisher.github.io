document.addEventListener('DOMContentLoaded', function() {
    particleground(document.getElementById('particles'), {
        dotColor: '#5cbdaa',
        lineColor: '#5cbdaa'
    });
    var intro = document.getElementById('intro');
    intro.style.marginTop = -intro.offsetHeight / 2 + 'px';
}, false);


window.onload = function() {
    document.body.addEventListener("mousemove", function(event) {
        var cursor = document.getElementById("cursor22");

        //TODO: More consistent way of aligning the cursor without awkward offsets?
        var x = event.pageX - cursor.width + 7;
        var y = event.pageY - 7;

        cursor.style.left = x;
        cursor.style.top = y;
    });
}