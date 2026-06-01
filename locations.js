const SUPABASE_URL = "https://tdttzcghkwksmqenmplw.supabase.co/rest/v1/locations";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkdHR6Y2doa3drc21xZW5tcGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTc2MzIsImV4cCI6MjA5NTg3MzYzMn0.LYZO_1u8VZaeVrXxw-CBk-x-SjOFDVFFy6hRn-wKAng";

async function loadLocations() {

    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/locations?select=*`,
        {
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        }
    );

    const data = await response.json();

    const tbody = document.querySelector("tbody");

    data.forEach(loc => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${loc.name}</td>
            <td>${loc.latitude}</td>
            <td>${loc.longitude}</td>
            <td>${loc.accuracy} m</td>
            <td>${new Date(loc.created_at).toLocaleString()}</td>
        `;

        tbody.appendChild(row);
    });
}

loadLocations();