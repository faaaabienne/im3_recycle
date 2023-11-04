import { supa } from "../config/config.js";


const kategorie = document.querySelector('#kategorie');
btn.addEventListener('click', insertInput);


async function insertInput() {
  const input = document.querySelector ('#first_name');

  const { data: actors, error } = await supa.from("category").insert([
    {
      'user_id': 'input.value',
      'category_id': 'kategorie.value'
    }
  ]);
  return actors;
}


