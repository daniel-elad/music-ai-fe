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
  
    // יצירת כפתורי רדיו לכל פלייליסט
    function renderPlaylistRadios() {
      playlistOptions.innerHTML = ''; // לאפס את האפשרויות
  
      playlists.forEach(playlist => {
        const label = document.createElement('label');
        label.style.display = "block";
  
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'playlist';
        radio.value = playlist.id;
  
        label.appendChild(radio);
        label.appendChild(document.createTextNode(` ${playlist.name} → [${playlist.songs.join(', ')}]`));
        playlistOptions.appendChild(label);
      });
    }
  
    renderPlaylistRadios(); // יצירת האפשרויות עם הפלייליסטים
  
    // טיפול בכפתור שליחה
    submitButton.addEventListener('click', () => {
      const selectedRadio = document.querySelector('input[name="playlist"]:checked');
      const selectedId = selectedRadio ? selectedRadio.value : null;
  
      if (!selectedId) {
        alert("Please select a playlist.");
        return;
      }
  
      const selectedPlaylist = playlists.find(playlist => playlist.id == selectedId);
      const prompt = `Create an album artwork in surreal style for the following songs: ${selectedPlaylist.songs.join(', ')}`;
      
      console.log('📤 Prompt to OpenAI:', prompt); // הדפסה לקונסול
      console.log('🎧 Selected Playlist ID:', selectedId); // הדפסת ה־ID של הפלייליסט הנבחר
  
      alert(`Prompt and playlist ID sent (mock)! Check console.`);
    });
  });
  