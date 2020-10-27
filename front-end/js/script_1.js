// Event handling
document.addEventListener("DOMContentLoaded",
    function (event) {
        var i = 0;
        var k = 0;
        // Unobtrusive event binding
        document.querySelector(".button1")
            .addEventListener("click", function () {
                k++;
                if (i > 6) {
                    i = 1;
                } else {
                    i++;
                }// Call server to get the name
                if (k % 5) {
                    getName(i);
                } else {
                    getMyName();
                }
            });
    }
);

function getMyFotoString(foto) {
    return `<img class=\"foto\" src=\"${foto}\" >`
}

function getName(i) {
    $ajaxUtils
        .sendGetRequest("https://nodejs12344.herokuapp.com/users/" + i,
            function (request) {
                console.log(request.responseText);
                var personObject = JSON.parse(request.responseText)[0];
                insertData('#content', personObject.full_name);
                insertData('#content1', personObject.email);
                const image_code = `<img class=\"foto\" src=\"${personObject.photo_link}\" >`;
                insertData('#content2', image_code);
                insertData('#content_address', personObject.address);
                insertData('#content_phone', personObject.phone_number);
            });
}

function getMyName() {
    insertData('#content', " Kateryna Shmat");
    insertData('#content1', "katushkashmat@gmail.com");
    insertData('#content2', getMyFotoString("img/Kate.jpg"));
    insertData('#content_address', "Kiev");
    insertData('#content_phone', "380995170049");
}


function insertData(selector, text) {
    document.querySelector(selector)
        .innerHTML = text;
}