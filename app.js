const SUPABASE_URL = "https://tdttzcghkwksmqenmplw.supabase.co/rest/v1/locations";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkdHR6Y2doa3drc21xZW5tcGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyOTc2MzIsImV4cCI6MjA5NTg3MzYzMn0.LYZO_1u8VZaeVrXxw-CBk-x-SjOFDVFFy6hRn-wKAng";

async function sendLocation() {

    const name = document.getElementById("name").value.trim();

    if (!name) {
        alert("Enter your name");
        return;
    }

    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {

            const body = {
                name: name,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
            };

            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/locations`,
                {
                    method: "POST",
                    headers: {
                        "apikey": SUPABASE_KEY,
                        "Authorization": `Bearer ${SUPABASE_KEY}`,
                        "Content-Type": "application/json",
                        "Prefer": "return=minimal"
                    },
                    body: JSON.stringify(body)
                }
            );

            document.getElementById("status").innerText =
                response.ok
                ? "Location saved!"
                : "Error saving location";
        },
        (err) => {
            alert(err.message);
        },
        {
            enableHighAccuracy: true
        }
    );
}