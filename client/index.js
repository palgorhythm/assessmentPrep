const loginButton = document.querySelector('#login-button');
const signupButton = document.querySelector('#signup-button');
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');

// fetch('/checkSession')
//   .then(res => res.json())
//   .then(res => {
//     if (res) {
//       onLogin(res.user_id); // need to put in username
//     }
//   })
//   .catch(err => {
//     console.log(err);
//   });

loginButton.addEventListener('click', e => {
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uname: usernameInput.value,
      pw: passwordInput.value
    })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data !== 'you are not a user') {
        onLogin(usernameInput.value);
      }
    });
});

signupButton.addEventListener('click', e => {
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uname: usernameInput.value,
      pw: passwordInput.value
    })
  }).then(() => {
    onLogin(usernameInput.value);
  });
});

const toDoContainer = document.querySelector('#to-do');

const toDoCreator = (text, todo_id) => {
  const toDoArticle = document.createElement('article');
  toDoArticle.dataset.todo_id = todo_id;

  const toDoText = document.createElement('p');
  toDoText.innerText = text;

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delet this!';

  deleteButton.addEventListener('click', e => {
    toDoArticle.parentNode.removeChild(toDoArticle);
    fetch('/deleteTodo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        todo_id
      })
    });
  });

  toDoArticle.appendChild(toDoText);
  toDoArticle.appendChild(deleteButton);

  toDoArticle.classList.add('to-do-container');

  return toDoArticle;
};

const onLogin = async username => {
  // we aren't using react so i have to do something like this to prevent extra things from popping up
  while (toDoContainer.firstChild) {
    toDoContainer.removeChild(toDoContainer.firstChild);
  }

  const toDoFetch = await fetch(`/getAllTodos/${username}`);
  const toDos = await toDoFetch.json();

  const title = document.createElement('h1');
  title.innerText = 'To Do:';
  toDoContainer.appendChild(title);

  const toDoList = document.createElement('section');

  toDos.forEach(({ text, todo_id }) => {
    toDoList.appendChild(toDoCreator(text, todo_id));
  });

  toDoContainer.appendChild(toDoList);

  const toDoInput = document.createElement('textarea');
  toDoContainer.appendChild(toDoInput);

  const submitButton = document.createElement('button');
  submitButton.innerText = 'Submit!';
  submitButton.addEventListener('click', e => {
    fetch('/newTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uname: username,
        text: toDoInput.value
      })
    })
      .then(res => res.json())
      .then(({ todo_id }) => {
        // GET ID FROM QUERY AND ADD TO DATASET ???
        toDoList.appendChild(toDoCreator(toDoInput.value, todo_id));
        toDoInput.value = '';
      });
  });

  toDoContainer.appendChild(document.createElement('br'));
  toDoContainer.appendChild(submitButton);
};
