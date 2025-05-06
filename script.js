document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-mock');
    const playlistOptions = document.getElementById('playlist-options');

    const playlists = [
        {
            id: 1,
            name: "Chill Vibes",
            songs: ["Misty Mountains", "Ocean Whispers", "Calm Horizon"]
        },
        {
            id: 2,
            name: "Party Hits",
            songs: ["Dance Fever", "Neon Lights", "Bass Drop"]
        },
        {
            id: 3,
            name: "Retro Wave",
            songs: ["Synth Night", "Miami Drift", "Digital Sunset"]
        }
    ];



    // פונקציה לשלוף את הפלייליסטים מהשרת
    async function fetchPlaylists() {
        try {
            const response = await fetch('http://localhost:4000/mock');  // הכתובת של השרת שלך
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const playlists = await response.json();  // פרס את התשובה כ-JSON

            renderPlaylistRadios(playlists);  // עדכון ה-DOM עם הפלייליסטים
        } catch (error) {
            console.error('Error fetching playlists:', error);
            alert('There was an error fetching playlists. Please try again later.');
        }
    }

    const removePlaylists = () => {
        const playlistsElement = document.querySelector('.playlists');
        if (playlistsElement) {

            playlistsElement.parentElement.removeChild(playlistsElement);
        }
    }

    async function fetchImage(id) {
        try {
            removePlaylists();
            initLoader();
            const response = await fetch(`http://localhost:4000/openai/${id}`);  // הכתובת של השרת שלך
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();  // פרס את התשובה כ-JSON
            removeLoader();
            return data;
        } catch (error) {
            console.error('Error fetching playlists:', error);
            alert('There was an error fetching playlists. Please try again later.');
        }
    }

    // יצירת כפתורי רדיו לכל פלייליסט
    function renderPlaylistRadios(playlists) {
        playlistOptions.innerHTML = ''; // לאפס את האפשרויות
        if (playlists) {

            playlists.forEach(playlist => {
                const label = document.createElement('label');
                const span = document.createElement('span');
                span.innerHTML = playlist.songs.map(song => `${song.artist} - ${song.name}`).join('\n')
                span.style.display = "block";

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'playlist';
                radio.value = playlist.id;

                label.appendChild(radio);
                label.appendChild(span);
                playlistOptions.appendChild(label);
            });
        }

    }

    renderPlaylistRadios(); // יצירת האפשרויות עם הפלייליסטים

    const initLoader = () => {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.id = 'loader';
        loadingContainer = document.getElementById('loadingContainer');
        if (loadingContainer) {
            loadingContainer.appendChild(loader);
        }
    }

    const removeLoader = () => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.parentElement.removeChild(loader);
        }
    }

    // טיפול בכפתור שליחה
    submitButton.addEventListener('click', async () => {
        const selectedRadio = document.querySelector('input[name="playlist"]:checked');
        const selectedId = selectedRadio ? selectedRadio.value : null;

        if (!selectedId) {
            alert("Please select a playlist.");
            return;
        }
        const data = await fetchImage(selectedId);
        const image = document.getElementById('aiImage');
        if (data) {
            image.src = data?.image;
            image.style.display = 'block'
        }
    });

    fetchPlaylists();
});
