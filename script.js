let hash = window.location.search.substring(1, window.location.search.length);
let encoder = true;

if (hash != "") {
    document.querySelector('#url-input').classList += 'hide';
    document.querySelectorAll('br')[0].classList += 'hide';
    encoder = false;
}

document.getElementById('button').addEventListener("click", function () {
    let url = document.querySelector('#url-input').value;
    let password = document.querySelector('#password-input').value;

    if (encoder == true) {
        fetch('http://192.168.1.101:3000/encode/' + url + '/' + password, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text())
            .then(data => displayLink(data))
            .catch(error => console.error(error));

    } else {
        fetch('http://192.168.1.101:3000/decode/' + hash + '/' + password, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text())
            .then(data => (window.location.assign("http://" + data)))
            .catch(error => console.error(error));
    }
});

function displayLink(hash) {
    document.querySelector('#copy-output').value = "http://127.0.0.1:3001/?" + hash;
    document.querySelector('#copy-output').classList.remove('hide');
    document.querySelector('#password-input').classList.add('hide');
    document.querySelector('#url-input').classList.add('hide');
    document.querySelector('#button').classList.add('hide');
    document.querySelector('#copy-button').classList.remove('hide');

    // Get the text field
    let copyText = document.querySelector("#copy-output");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
}

function copy() {
    // Get the text field
    let copyText = document.querySelector("#copy-output");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}
