import { supa } from "../config/config.js";


async function showActors() {
  const table = document.querySelector('#table');
  const { data: actors, error } = await supa.from("actors").select();
  actors.forEach(actor => {
    const output = `
      <tr>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td>${user.user_points}</td>
      </tr>
    `;
    table.innerHTML += output;
  })
}
showActors();


