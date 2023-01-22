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
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));

    } else {
        fetch('http://192.168.1.101:3000/decode/' + hash + '/' + password, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }
});
