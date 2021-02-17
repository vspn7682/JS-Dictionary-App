const text = document.querySelector('#text');
const form = document.querySelector('.form');
const btn = document.querySelector('#btn');
const notFound = document.querySelector('.notFound p');
const loading = document.querySelector('#loading');
const suggestions = document.querySelector('.suggestions');
const suggestions_span = document.querySelector('.suggestions span');
const result = document.querySelector('.result');
const result_para = document.querySelector('.result p');
const url = 'https://dictionaryapi.com/api/v3/references/learners/json/';
const apiKey = '6468fbc7-be55-4187-9f0e-48ca8d680cfb';


text.addEventListener('input', () => {
    notFound.style.display = 'none';
    result.style.display = 'none';
    suggestions.style.display = 'none';
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = text.value;

    loading.style.display = 'block';

    fetch(`${url}${input}?key=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {

            if (!data.length) {
                loading.style.display = 'none';
                notFound.style.display = 'block';
                notFound.innerText = 'Result not found...';
                return;
            }

            // console.log(typeof (data[0]))
            if (typeof (data[0]) === 'string') {
                loading.style.display = 'none';
                suggestions.style.display = 'block';

                data.forEach(datas => {
                    const span = document.createElement('span');
                    span.classList.add('suggested');
                    span.innerText = datas;
                    suggestions.appendChild(span);
                })

                return;
            }


            const output = data[0].shortdef[0];
            loading.style.display = 'none'
            result.style.display = 'block';
            result_para.innerText = output;


        })
})