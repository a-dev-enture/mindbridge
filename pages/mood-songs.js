
import { useState } from 'react';
import NavBar from '../components/NavBar';

export default function MoodSongs() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const analyzeMood = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/mood/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data.analysis);
        generateSongSuggestions(data.analysis);
      } else {
        console.error('Error analyzing mood');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSongSuggestions = (moodAnalysis) => {
    // Simple mood-based song suggestions based on keywords in analysis
    const moodKeywords = moodAnalysis.toLowerCase();
    let suggestedSongs = [];

    if (moodKeywords.includes('happy') || moodKeywords.includes('joy') || moodKeywords.includes('excited')) {
      suggestedSongs = [
        { title: "Happy", artist: "Pharrell Williams", genre: "Pop" },
        { title: "Good as Hell", artist: "Lizzo", genre: "Pop" },
        { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", genre: "Funk" },
        { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", genre: "Pop" },
      ];
    } else if (moodKeywords.includes('sad') || moodKeywords.includes('melancholy') || moodKeywords.includes('depressed')) {
      suggestedSongs = [
        { title: "Someone Like You", artist: "Adele", genre: "Pop Ballad" },
        { title: "Mad World", artist: "Gary Jules", genre: "Alternative" },
        { title: "Breathe Me", artist: "Sia", genre: "Pop" },
        { title: "The Sound of Silence", artist: "Simon & Garfunkel", genre: "Folk" },
      ];
    } else if (moodKeywords.includes('angry') || moodKeywords.includes('frustrated') || moodKeywords.includes('rage')) {
      suggestedSongs = [
        { title: "Break Stuff", artist: "Limp Bizkit", genre: "Nu Metal" },
        { title: "Killing in the Name", artist: "Rage Against the Machine", genre: "Rock" },
        { title: "Bodies", artist: "Drowning Pool", genre: "Metal" },
        { title: "Chop Suey!", artist: "System of a Down", genre: "Metal" },
      ];
    } else if (moodKeywords.includes('calm') || moodKeywords.includes('peaceful') || moodKeywords.includes('relaxed')) {
      suggestedSongs = [
        { title: "Weightless", artist: "Marconi Union", genre: "Ambient" },
        { title: "Clair de Lune", artist: "Claude Debussy", genre: "Classical" },
        { title: "Aqueous Transmission", artist: "Incubus", genre: "Alternative" },
        { title: "Holocene", artist: "Bon Iver", genre: "Indie Folk" },
      ];
    } else if (moodKeywords.includes('anxious') || moodKeywords.includes('nervous') || moodKeywords.includes('worried')) {
      suggestedSongs = [
        { title: "Anxiety", artist: "Julia Michaels ft. Selena Gomez", genre: "Pop" },
        { title: "Stressed Out", artist: "Twenty One Pilots", genre: "Alternative" },
        { title: "Unwell", artist: "Matchbox Twenty", genre: "Rock" },
        { title: "Heavy", artist: "Linkin Park ft. Kiiara", genre: "Alternative" },
      ];
    } else {
      suggestedSongs = [
        { title: "Don't Stop Believin'", artist: "Journey", genre: "Rock" },
        { title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock" },
        { title: "Hotel California", artist: "Eagles", genre: "Rock" },
        { title: "Imagine", artist: "John Lennon", genre: "Rock" },
      ];
    }

    setSongs(suggestedSongs);
  };

  return (
    <div style={{ fontFamily: "Montserrat, Arial, sans-serif", background: "#f4f7fa", minHeight: "100vh" }}>
      <NavBar />
      
      <div style={{ padding: "60px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ 
          fontSize: "2.5rem", 
          fontWeight: "700", 
          color: "#183C57", 
          textAlign: "center", 
          marginBottom: "2rem" 
        }}>
          Mood-Based Song Suggestions
        </h1>
        
        <div style={{ 
          background: "#fff", 
          padding: "2rem", 
          borderRadius: "16px", 
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)", 
          marginBottom: "2rem" 
        }}>
          <h2 style={{ 
            fontSize: "1.25rem", 
            fontWeight: "600", 
            color: "#183C57", 
            marginBottom: "1rem" 
          }}>
            How are you feeling today?
          </h2>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe your current mood or what's on your mind..."
            style={{
              width: "100%",
              minHeight: "120px",
              padding: "1rem",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "vertical",
              marginBottom: "1rem"
            }}
          />
          
          <button
            onClick={analyzeMood}
            disabled={loading || !text.trim()}
            style={{
              background: loading || !text.trim() ? "#9ca3af" : "#183C57",
              color: "#fff",
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              border: "none",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: loading || !text.trim() ? "not-allowed" : "pointer",
              transition: "background 0.2s"
            }}
          >
            {loading ? "Analyzing..." : "Get Song Suggestions"}
          </button>
        </div>

        {analysis && (
          <div style={{ 
            background: "#fff", 
            padding: "1.5rem", 
            borderRadius: "12px", 
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)", 
            marginBottom: "2rem" 
          }}>
            <h3 style={{ 
              fontSize: "1.1rem", 
              fontWeight: "600", 
              color: "#183C57", 
              marginBottom: "0.5rem" 
            }}>
              Mood Analysis:
            </h3>
            <p style={{ color: "#444", lineHeight: "1.6" }}>{analysis}</p>
          </div>
        )}

        {songs.length > 0 && (
          <div style={{ 
            background: "#fff", 
            padding: "2rem", 
            borderRadius: "16px", 
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)" 
          }}>
            <h3 style={{ 
              fontSize: "1.5rem", 
              fontWeight: "600", 
              color: "#183C57", 
              marginBottom: "1.5rem" 
            }}>
              Recommended Songs for Your Mood:
            </h3>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
              gap: "1rem" 
            }}>
              {songs.map((song, index) => (
                <div key={index} style={{
                  background: "#f8fafc",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb"
                }}>
                  <h4 style={{ 
                    fontSize: "1.1rem", 
                    fontWeight: "600", 
                    color: "#1da47d", 
                    marginBottom: "0.5rem" 
                  }}>
                    {song.title}
                  </h4>
                  <p style={{ 
                    color: "#555", 
                    marginBottom: "0.25rem" 
                  }}>
                    by {song.artist}
                  </p>
                  <p style={{ 
                    color: "#777", 
                    fontSize: "0.9rem",
                    background: "#e5e7eb",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    display: "inline-block"
                  }}>
                    {song.genre}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
