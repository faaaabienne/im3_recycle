console.log("Initialisierung Supabase");

// Supabase Initialisierung
const supabaseUrl = 'https://sdbjufroocuobdtvassq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkYmp1ZnJvb2N1b2JkdHZhc3NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMzY3MzIsImV4cCI6MjAxMTkxMjczMn0.iLluyCY0Q3IrvYmAr_eYOwwbGCUr5rYwbcpnvbW62AA'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }