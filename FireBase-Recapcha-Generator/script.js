// firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5uktqyajJ43r80431x3HP1ILUKcz1qU4",
    authDomain: "recaptcha-471bc.firebaseapp.com",
    projectId: "recaptcha-471bc",
    storageBucket: "recaptcha-471bc.appspot.com",
    messagingSenderId: "375699605631",
    appId: "1:375699605631:web:0e7fc473cf2890c9be174a",
    measurementId: "G-26452G3SPP"
}

// initialize firebase
firebaseConfig.initializeApp(firebaseConfig);
const auth = firebase.auth();

// render reCaptcha
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    "callback" : function(response) {
        // recaptcha solved - allow submit
        document.getElementById('recaptcha-form').addEventListener('submit', function(event) {
            event.preventDefault();
            alert('reCapTcha completed');
        });
    },
    'expired-callback': function() {
        // response expired. Ask user to solve reCAPTCHA again
        alert('reCAPTCHA expired, please solve again');
    }
});

recaptchaVerifier.render().then(function(widgetId) {
    window.recaptchaWidgetID = widgetId;
}).catch(function(error) {
    console.error("reCAPTCHA render failed: ", error);
});