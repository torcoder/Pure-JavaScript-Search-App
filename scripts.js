const search = document.getElementById('filter');
const items = document.getElementById('result');

let users = [];

const fetchUser = () => {
  fetch('./fake_data.json')
    .then((res) => {
      res
        .json()
        .then((res) => {
          users = res;
          console.log(res);
          showUsers(users);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const showUsers = (arr) => {
  let output = '';
  // <img src="${picture}?image=${index}" alt="" />
  // Resimler hep aynı geliyor index numarasına göre de sabitleyebilirim.
  arr.forEach(
    ({ balance, picture, gender, name, email, company, index }) =>
      (output += `
    <div class="card"> 
        <div class="card-header">
          <img src="${picture}" alt="" />
        </div>
        <div class="card-body">
          <div class="card-title">
            <span class="${getClassName(gender)}">${gender}</span>
            <span>${balance}</span>
          </div>
          <h4 class="card-name">${name}</h4>
            <div class="info">
              <h5>${email}</h5>
              <small>${company}</small>
            </div>
          </div>
        </div>
      </div>
  `)
  );
  items.innerHTML = output;
};

search.addEventListener('input', (e) => {
  const el = e.target.value.toLowerCase();
  const newUser = users.filter(
    (user) =>
      user.name.toLowerCase().includes(el) ||
      user.email.toLowerCase().includes(el)
  );

  showUsers(newUser);
});

function getClassName(gender) {
  if (gender == 'male') {
    return 'card-gender';
  } else if (gender == 'female') {
    return 'card-gender pink';
  }
  return 'card-gender';
}

document.addEventListener('DOMContentLoaded', fetchUser);
