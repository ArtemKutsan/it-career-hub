// const profileBtn = document.querySelector("#profile-btn");
const profileEl = document.querySelector('#profile');
// const logoutBtns = document.querySelectorAll(".logout");
const deleteAccountBtn = document.querySelector('#delete-account');

const users = JSON.parse(localStorage.getItem('users')) || [];
const authToken = localStorage.getItem('authToken');
const authUser = authToken ? users.filter((user) => user.token === authToken)[0] : null;

if (authToken && authUser) {
  const p = document.createElement('p');
  p.textContent = `С возвращением, ${authUser.name}! Вы вошли как ${authUser.email}`;
  profileEl.appendChild(p);
}

deleteAccountBtn.addEventListener('click', () => {
  const newUsers = users.filter((user) => user.token != authUser.token);
  localStorage.setItem('users', JSON.stringify(newUsers));
  localStorage.removeItem('authToken');
  window.location = './';
});
