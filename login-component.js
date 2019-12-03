const template = document.createElement('template');
template.innerHTML = `
<style>
  :host {
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }

  .login-form {
    width: 500px;
    margin: 200px auto;
    padding: 50px;
    border-radius: 5px;
  }

  .login-form h1 {
    text-align: center;
    color: #3e5072;
  }

  input {
    height: 30px;
    background: #a9d7ff11;
    border: 1px solid #a9d7ffee;
    border-radius: 5px;
    padding: 5px 10px;
  }

  label {
    color: #3e5072ee;
    font-weight: bold;
  }

  .row {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .submit-btn {
    width: 100%;
    height: 50px;
    background: #589edc;
    color: #eeeeee;
    font-weight: bold;
    border: 1px solid #589edc;
    cursor: pointer;
  }

  .submit-btn:hover {
    background: #7bb2e4;
  }
</style>

<div class="login-form">
  <h1>Login</h1>
  <div class="email-block row">
    <label>Email address:</label>
    <input type="text">
  </div>
  <div class="password-block row">
    <label>Password:</label>
    <input type="password">
  </div>
  <div class="buttons-block">
    <button class="submit-btn">LOG IN</button>
  <div>
</div>
`;


class LoginComponent extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.email = 'user111@test.test';
    this.password = '1111';

    this._shadowRoot.querySelector('.email-block').addEventListener('change', (event) => {
      this.email = event.target.value;
    });

    this._shadowRoot.querySelector('.password-block').addEventListener('change', (event) => {
      this.password = event.target.value;
    });

    this._shadowRoot.querySelector('.submit-btn').addEventListener('click', () => {
      this.submitData();
    });
  }

  async submitData() {

    const data = { 
      email: this.email,
      password: this.password
    }

    try {
      const response = await postData('http://127.0.0.1:3000/login', data);
      console.log(response);
    } catch (error) {
      // console.error(error);
    }
  }
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

window.customElements.define('login-component', LoginComponent);
