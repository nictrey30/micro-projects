const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const searchForm = document.querySelector('.search');
let items = document.querySelectorAll('li span');
let arrayItems = Array.from(items).map(item => item.textContent);
const searchList = document.querySelectorAll('.todos span');
const searchListArray = [];
searchList.forEach(item => searchListArray.push(item.innerText));

const generateTemplate = todo => {
  let html = `
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
  </li>
  `;
  return html;
};

// adding todos
addForm.addEventListener('submit', e => {
  e.preventDefault();
  let todo = addForm.add.value.trim();
  if (todo) {
    if (arrayItems.includes(todo)) {
      alert('todo already in the list');
    } else {
      list.innerHTML += generateTemplate(todo);
      arrayItems.push(todo);
      searchListArray.push(todo);
    }
    addForm.reset();
  }
});

// deleteing todos
list.addEventListener('click', e => {
  if (e.target.tagName === 'I') {
    e.target.parentElement.remove();
    arrayItems.splice(
      arrayItems.indexOf(e.target.parentElement.children[0].textContent),
      1
    );
  }
});

// searching & filtering todos
const displaySearchList = (displayArray, text) => {
  if (text) {
    // hide all todos
    Array.from(list.children).forEach(el => {
      // el.style.color = 'red';
      el.classList.remove('d-flex');
      el.classList.add('d-none');
    });
    // build all todos
    Array.from(list.children).forEach(el => {
      let index, innerHTML;
      if (displayArray.includes(el.children[0].textContent)) {
        // console.log(el.children[0].textContent);
        // el.style.color = 'green';
        el.classList.remove('d-none');
        el.classList.add('d-flex');
        index = el.children[0].textContent.indexOf(text);
        // redo each list item to the original, because of <span> adding
        searchListArray.forEach(elem => {
          if (elem === el.children[0].textContent) {
            // do this before innerHTML is modified with span
            innerHTML = elem;
          }
        });
        // highlight composition - if text was found in list element
        if (index >= 0) {
          innerHTML =
            innerHTML.substring(0, index) +
            "<span class='highlight'>" +
            innerHTML.substring(index, index + text.length) +
            '</span>' +
            innerHTML.substring(index + text.length);
        }
        el.children[0].innerHTML = innerHTML;
      }
    });
  }
};

searchForm.addEventListener('keyup', e => {
  let searchText = '';
  if (e.target.tagName === 'INPUT') {
    searchText += searchForm.search.value;
  }
  // in case of nothing in search make list as new
  if (searchText === '') {
    Array.from(list.children).forEach(el => {
      el.classList.remove('d-none');
      if (!el.classList.contains('d-flex')) el.classList.add('d-flex');
      if (el.children[0].children[0])
        el.children[0].children[0].classList.remove('highlight');
    });
  }
  let displayArray = searchListArray.filter(el => el.includes(searchText));
  displaySearchList(displayArray, searchText);
});
