document.getElementById('button').addEventListener('click', writeName, false); // false is for bubbling propagation

function writeName(e) {



    var changeLabel = function changeLabel(label, value) {
      document.getElementById(label).value = value;
    };

    $('#bt').click(function() {
       $('#ex').click();
    });

    //    API call here

    changeLabel('name', 'Kamiar');
}