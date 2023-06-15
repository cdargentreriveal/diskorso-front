<script src='https://app.neocamino.com/api?id=aw2e47xw' type='text/javascript' defer></script>

<meta name="google-site-verification" content="bZ9qlBpBuKG4pGpeqEsU-AQBBuEyNdxvctyec6QW2s4" />

<script>
document.addEventListener('wpcf7mailsent', function(event) {
event.preventDefault();
var popup = document.getElementById('popup-message');
if (popup) {
  setTimeout(function(){
	popup.style.display = 'block';
	},500)
	setTimeout(function() {
      // Fermer la popup après 3 secondes
      closePopup();
    }, 5000);

}
var titlepopup= popup.querySelector('.title-changed')
var messagepopup= popup.querySelector('.message-change')
  if (284963 === event.detail.contactFormId) {
    // Modifier le texte en fonction du formulaire envoyé
    titlepopup.textContent = 'message';
	messagepopup.textContent = 'un mail de confirmation';
  }
	if (285016 === event.detail.contactFormId) {
    // Modifier le texte en fonction du formulaire envoyé
    titlepopup.textContent = 'inscription';
	messagepopup.textContent = 'la première newsletter';
  }
	if (285020 === event.detail.contactFormId) {
    // Modifier le texte en fonction du formulaire envoyé
    titlepopup.textContent = 'intérêt';
	messagepopup.textContent = 'votre livre blanc';
  }
	//   // popup contact anglais
		if (285007 === event.detail.contactFormId) {
    // Modifier le texte en fonction du formulaire envoyé
    titlepopup.textContent = 'message';
	messagepopup.textContent = 'an email';
  }
	//   // popup NL anglais
			if (285017 === event.detail.contactFormId) {
    // Modifier le texte en fonction du formulaire envoyé
    titlepopup.textContent = 'subscription';
	messagepopup.textContent = 'the first newsletter';
  }

//   // Réinitialise le formulaire si nécessaire
document.getElementById('285017').reset();
 }, false);

function closePopup() {
 var popup = document.getElementById('popup-message');
if (popup) {
  popup.style.display = 'none';
 }
 }
document.addEventListener('DOMContentLoaded', function() {
	const btnsContactSlider = document.querySelectorAll('.french-slider .et_pb_button_wrapper')
	btnsContactSlider.forEach((btnContact) =>{
		btnContact.classList.add('popmake-284979')
	})

});
	document.addEventListener('DOMContentLoaded', function() {
	const btnsContactSlider = document.querySelectorAll('.english-slider .et_pb_button_wrapper')
	btnsContactSlider.forEach((btnContact) =>{
		btnContact.classList.add('popmake-285009')
	})

});


document.addEventListener('wpcf7mailsent', function(event) {
  if (285020 === event.detail.contactFormId) { // Remplacez '123' par l'ID de votre formulaire Contact Form 7
    setTimeout(function() {
      window.open('https://seabim-breakwater.com/wp-content/uploads/2023/05/Livre_blanc_SEABIM.pdf');
    }, 3000); // Délai de 2 secondes en millisecondes
  }
});

document.addEventListener('wpcf7mailsent', function(event) {
	event.preventDefault();
  // Ciblez l'élément de champ de téléphone
  var phoneField = document.querySelector('#phone-text input');

  // Ajoutez une fonction de validation à l'événement "blur" (lorsque le champ perd le focus)
  phoneField.addEventListener('blur', function() {
    // Récupérez la valeur du champ de téléphone
    var phoneNumber = this.value;

    // Vérifiez si la longueur est différente de 10
    if (phoneNumber.length !== 10) {
      // Affichez un message d'erreur
      alert("coucou")
      this.classList.add('error');
      this.value = '';
      this.placeholder = 'Veuillez entrer un numéro de téléphone valide (10 caractères)';
    } else {
      // Supprimez la classe d'erreur si la longueur est correcte
      this.classList.remove('error');
    }
  });
});

</script>