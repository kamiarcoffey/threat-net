document.getElementById('button').addEventListener('click', writeName, false); // false is for bubbling propagation

function writeName(e) {

    var changeLabel = function changeLabel(label, value) {
      document.getElementById(label).value = value;
    };

    $.ajax({
        type : "POST",
        url : '/demo',
        dataType: "json",
        data: {},
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            changeLabel('name', data['name']);
            console.log(data);
            }
        });

}