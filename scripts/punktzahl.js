import { supa } from "../config/config.js";

calculatePunktzahl();

async function calculatePunktzahl() {
  let currentUserId = 4; // TODO: mit Dozent eingeloggter User Daten holen
  const { userHasCategoryData, uHCError } = await supa
    .from('User_has_category')
    .select()
    .eq('user_id', currentUserId);

// TODO: Dozent, Idee Listen von Werten mit category_id drin sind (user_has_category tabelle)
// über diese category_ids müssen wir von Categories Tabelle Punktzahl holen und zusammenzählen

  const sum = userHasCategoryData.reduce( (accumulator, object) => {
    const { categoryData, cError } = supa
    .from('Categories')
    .select('category_points')
    .eq('category_id', object.category_id);
    return accumulator + categoryData.category_points;
  }, 0);

  console.log(userHasCategoryData, uHCError);
  console.log(sum);
  const currentUser = supa.auth.user()
  console.log(currentUser)
}

