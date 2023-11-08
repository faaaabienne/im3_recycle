import { supa } from "../config/config.js";

var currentUser = supa.auth.user()
console.log(currentUser)

const weiterButton = document.querySelector('#weiterButton');
weiterButton.addEventListener('click', insertInput);

async function insertInput() {
  const input = document.querySelector('input[name="kategorie"]:checked').value;
  console.log('input', '<' + input + '>');
  
  const { data, error } = await supa
    .from('Categories')
    .select()
    .eq('category_name', input)

  console.log(data, error);
  console.log(data[0].id);
  console.log(currentUser.id);

  const { data: insertedData, error: insertError } = await supa
    .from('User_has_category')
    .insert([
      {
        'user_id': currentUser.id,
        'category_id': data[0].id
      }
    ]);

  console.log(insertedData, insertError);
}
