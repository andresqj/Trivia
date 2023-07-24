export const getCategories = async (url) => {
  try {
    const res = await axios.get(url);
    const data = await res.data.trivia_categories;
    return data;
    
  } catch (err) {
    if(err) return 'Internal server error';
  }
}

export const getTrivia = async (url) => {
  try {
    const res = await axios.get(url);
    const data = res.data.results;
    const error_code = res.data.response_code;
    if(error_code === 1) return {err_msg: 'No existen resultados para la búsqueda!'};
    return data

  } catch (err) {
    if(err) return 'Internal server error';
  }
}

export const showError = (element, message) => {
  let error = document.createElement('p');
  error.textContent = message;
  element.insertAdjacentElement('afterbegin', error);     
}

export const drawForm = (data = []) => {
  let html = (type === 'boolean') 
    ? '<h2>Choice True or False</h2>' 
    : '<h2>choose the option you consider correct</h2>' 

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const answers = getAnswers(element);

    switch (element.type) {
      case 'boolean':
        let radios = answers.map(
          (el, idx) => `
            <div class="form-control">
              <label for="answer-${idx}">${el}</label>
              <input type="radio" id="answer-${idx}" name="answer-${idx}" value="${el}">
            </div>
          `
        );
        radios = radios.join('')
  
        html +=`
        <article>
          <div>
            <h3>${element.question}</h3>
          </div>
  
          ${radios}
        </article>
        <hr/>
        `
        break;
    
      case 'multiple':
        let checbox = answers.map(
          (el, idx) => `
            <div class="form-control">
            <label for="answer-${idx}">${el}</label>
            <input type="checkbox" id="answer-${idx}" name="answer-${idx}" value="${el}">
            </div>
          `
        );
        checbox = checbox.join('')
        html +=`
          <article>
            <div>
              <h3>${element.question}</h3>
            </div>
            ${checbox}
          </article>
        `
        break;

      default:
        html += 'No es una opción válida'
        break;
    }
  }
  return html
}

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let tempIndex = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = tempIndex;
  }
}

const getAnswers = (obj) => {
  const answers = Object.values(obj.incorrect_answers.map(res => res))
  answers.push(obj.correct_answer);
  const shuffleAnswers = Array.from(answers)
  shuffleArray(shuffleAnswers)
  return shuffleAnswers;
}