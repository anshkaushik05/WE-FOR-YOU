let dealerButton = document.querySelector('#dealerButton');
let customerButton = document.querySelector('#customerButton');
let type1 = document.querySelector('#type');
let username1 = document.querySelector('#username');
let password1 = document.querySelector('#password');
let check = document.querySelector('checkbox');
let check12 = document.querySelector('#checking');
let Error1 = document.querySelector('#Error');
let signup = document.querySelector('#signup');


type1.value = 'dealer';

noId.addEventListener('click', (e) => {
  if (type.value === 'dealer') {
    signup.href = "http://localhost:3000/dealerRegister"
  }
  else {
    signup.href = "http://localhost:3000/customerRegister"
  }
})
check12.addEventListener('click', (e) => {
  e.preventDefault();
  axios.post('/login', {
    username: username1.value,
    password: password1.value,
    type: type1.value
  }).then(function (response) {
    if (response.data.value) {
      window.location.replace('/');
    }
    else {
      Error1.style.display = 'block';
    }
  })
    .catch(function (error) {
      console.log(error);
    });
})



dealerButton.addEventListener('click', () => {
  type1.value = "dealer";
  username1.value = "";
  password1.value = "";
  customerButton.style.background = "black";
  dealerButton.style.background = "linear-gradient(to right, #870000 0%, #190a05 100%)";
})
customerButton.addEventListener('click', () => {
  type1.value = "customer";
  username1.value = "";
  password1.value = "";
  customerButton.style.background = "linear-gradient(to right, rgb(93 4 2) 0%, #190a05 100%)";
  dealerButton.style.background = "black";
})
