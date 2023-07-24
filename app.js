import { API_CATEGORY, API_URL, API_URL_ALT } from './helpers/api.js';
import {drawForm, getCategories, getTrivia, showError} from './helpers/funtions.js'

const d = document;
let categories;

// DOM VARIABLES
const main = d.querySelector('main');
const modal = d.getElementById('modal');
const select = d.getElementById('categories');
const formCreate = d.getElementById('form-create');
const sectionTrivia = d.querySelector('#trivia');
const formTrivia = d.querySelector('#form-trivia');
const sectionHome = d.querySelector('#home');

d.addEventListener('DOMContentLoaded', async () => {
  categories = await getCategories(API_CATEGORY);
  
  if(categories) {
    select.innerHTML += '<option value="'+ 0 +'">Aleatorio</option>';
    categories.forEach(cat => select.innerHTML += `<option value="${cat.id}">${cat.name}</option>`);
  }
})

formCreate.addEventListener('submit', async e => {
  e.preventDefault();
  const category = e.target.categories.value;
  const difficulty = e.target.difficulty.value;
  const type = e.target.type.value;  
  let url = API_URL(category, difficulty, type);
  if(category === '0')  url = API_URL_ALT(difficulty, type);
  const data = await getTrivia(url);
  if(data.err_msg) showError(formCreate, data.err_msg);

  const contentTrivia = drawForm(data);
  sectionHome.classList.add('d-none');
  sectionTrivia.querySelector('.content-form').innerHTML = contentTrivia;
  sectionTrivia.classList.remove('d-none')
  modal.close();
})

formTrivia.addEventListener('submit', (e) => {
  e.preventDefault()
 const inputs = formTrivia.querySelectorAll('input');
  console.log(inputs)

})

d.addEventListener('click', e => {
  if(e.target.matches('#start')) modal.showModal();
  if(e.target.matches('#modal')) modal.close();
  
})

