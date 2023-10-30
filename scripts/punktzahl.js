import { supa } from "../../../00_setup/supabase.js";

const supabase = createClient('https://sdbjufroocuobdtvassq.supabase.co', 'process.env.SUPABASE_KEY');



const getCategories = async () => {
  const { data, error } = await supabase
    .from('Categories')
    .select('*');
  
  if (error) {
    console.error(error);
    return [];
  }
  
  return data;
}

