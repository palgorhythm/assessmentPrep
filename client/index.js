
const toDoContainer = document.querySelector('#to-do');

const toDoCreator = text => {
  const toDoArticle = document.createElement('article');

  const toDoText = document.createElement('p');
  toDoText.innerText = text;

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delet this!';

  deleteButton.addEventListener('click', e => {
    toDoArticle.parentNode.removeChild(toDoArticle);
  });

  toDoArticle.appendChild(toDoText);
  toDoArticle.appendChild(deleteButton);

  toDoArticle.classList.add('to-do-container')

  return toDoArticle;
}

// things to only do once logged in:

const toDos = ['finish werkshop', 'get quesadillos', 'get a job'];

const title = document.createElement('h1');
title.innerText = 'To Do:';
toDoContainer.appendChild(title);

const toDoList = document.createElement('section');

toDos.forEach(toDo => {
  toDoList.appendChild(toDoCreator(toDo));
});

toDoContainer.appendChild(toDoList);

const toDoInput = document.createElement('textarea');
toDoContainer.appendChild(toDoInput);

const submitButton = document.createElement('button');
submitButton.innerText = 'Submit!';
submitButton.addEventListener('click', e => {
  toDoList.appendChild(toDoCreator(toDoInput.value));
  toDoInput.value = '';
});

toDoContainer.appendChild(document.createElement('br'));
toDoContainer.appendChild(submitButton);