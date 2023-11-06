import { supa } from "../config/config.js";


const weiterButton = document.querySelector('#weiterButton');
weiterButton.addEventListener('click', insertInput);


async function insertInput() {
  const input = document.querySelector('input[name="kategorie"]:checked').value;
  console.log('input', '<' + input + '>');
  /* const { data: actors, error } = await supa.from("category").insert([
    {
      'user_id': 'input.value',
      'category_id': 'kategorie.value'
    }
  ]); */


  const { data, error } = await supa
    .from('Categories')
    .select()
    .eq('category_name', input)

  console.log(data, error);

  const currentUser= supa.auth.user()
  console.log(currentUser)
}

