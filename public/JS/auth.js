const firebaseConfig = {
  apiKey: "-----",
  authDomain: "-----.firebaseapp.com",
  projectId: "-----",
  storageBucket: "-----.appspot.com",
  messagingSenderId: "-----",
  appId: "-----",
  measurementId: "G------"
};

firebase.initializeApp(firebaseConfig);

function initApp() {
  
  const txtEmail = document.getElementById("emailGiris");
  const txtPassword = document.getElementById("passwordGiris");
  const txtUyeOlEmail = document.getElementById("emailUyeOl");
  const txtUyeOlPassword = document.getElementById("passwordUyeOl");
  const btnGiris = document.getElementById("btnGiris");
  const btnUyeOl = document.getElementById("btnUyeOl");

  function GirisYap(){
    const email = txtEmail.value;
    const password = txtPassword.value;

    if (email.length < 4) {
      alert('Lütfen E-mail girin.');
      return;
    }
    if (password.length < 4) {
      alert('Lütfen Şifreyi Girin');
      return;
    }

    const auth = firebase.auth();
    
    const bildirim = auth.signInWithEmailAndPassword(email, password);

    bildirim.catch(e=> console.log(e.message));

  }

  function CikisYap(){
    const auth = firebase.auth();
    auth.signOut();
  }
  

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){

      console.log(firebaseUser);

      btnGiris.textContent = "Çıkış Yap";
      btnGiris.removeEventListener('click',GirisYap);
      btnGiris.addEventListener('click',CikisYap);

    }else{
      btnGiris.textContent = "Giriş Yap";
      btnGiris.removeEventListener('click',CikisYap);
      btnGiris.addEventListener('click', GirisYap);
    }
  });


  btnUyeOl.addEventListener('click', 
  e=>{
    const email = txtUyeOlEmail.value;
    const password = txtUyeOlPassword.value;
    const auth = firebase.auth();

    var bildirim = auth.createUserWithEmailAndPassword(email, password);

    bildirim.catch(e=> console.log(e.message));
    
  });

}


window.onload = function() {
  initApp();
};