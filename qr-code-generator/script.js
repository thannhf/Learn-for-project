function showGenerator() {
    document.querySelector('.options').style.display = 'none';
    document.querySelector('.generator-container').style.display = 'flex';
}

function showScanner() {
    document.querySelector('.options').style.display = 'none';
    document.querySelector('.scanner-container').style.display = 'flex';
}

function generateQRCode() {
    const input = document.getElementById('qr-input').value;
    if(!input) {
        alert("please enter text to generate QR code.");
        return;
    }
    const canvas = document.getElementById("qrcode");
    generateQRCode.toCanvas(canvas, input, function(error) {
        if(error) console.error(error);
    });
}

function back() {
    document.querySelector('.options').style.display = 'flex';
    document.querySelector('.generator-container').style.display = 'none';
    document.querySelector('.scanner-container').style.display = 'none';
    document.getElementById('qr-result').textContent = '';
    document.getElementById('captured-image').style.display = 'none';
    if(scanner) {
        scanner.stop();
    }
}

let scanner;
function startScanner() {
    document.querySelector('.scanner-container button').textContent = 'Scan Again';
    document.getElementById('captured-image').style.display = 'none';
    document.querySelector('#scanner-container').style.display = '';
    document.getElementById('qr-result').textContent = '';

    const qrResult = document.getElementById('qr-result');
    const video = document.getElementById('video');
    const canvas = document.getElementById('captured-image');
    const context = canvas.getContext('2d');

    scanner = new Instascan.Scanner({video: video});
    scanner.addListener('scan', function(content) {
        qrResult.textContent = 'QR code detected: ' + content;

        // capture the current video frame
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.style.display = 'block';
        document.querySelector('#scanner-container').style.display = 'none';
        document.querySelector('.scanner-container button').textContent = 'Scan Again';
        scanner.stop();
    });

    Instascan.Camera.getCameras().then(function(cameras) {
        if(cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error("no cameras found.");
            alert('No cameras found');
        }
    }).catch(function(e) {
        console.error(e);
        alert(e);
    });
};