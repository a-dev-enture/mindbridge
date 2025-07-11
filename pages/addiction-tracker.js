
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

const API_BASE = '/api/addiction/tracker';

export default function AddictionTracker() {
  const [addictions, setAddictions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAddiction, setNewAddiction] = useState("");
  const [loading, setLoading] = useState(true);

  // Load addictions from API
  useEffect(() => {
    fetchAddictions();
  }, []);

  // Add real-time timer to update the counters every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Force re-render to update time calculations
      setAddictions(prevAddictions => [...prevAddictions]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchAddictions = async () => {
    try {
      const response = await fetch(API_BASE);
      if (response.ok) {
        const data = await response.json();
        // Convert backend data format to frontend format
        const addictionList = Object.entries(data).map(([name, startDate]) => ({
          id: Date.now() + Math.random(),
          name,
          startDate
        }));
        setAddictions(addictionList);
      }
    } catch (error) {
      console.error('Error fetching addictions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate time since addiction was started
  const getTimeSince = (startDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const diffMs = now - start;
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  };

  // Add new addiction
  const handleAddAddiction = async () => {
    if (!newAddiction.trim()) return;
    
    try {
      const startDate = new Date().toISOString();
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [newAddiction.trim()]: startDate
        }),
      });

      if (response.ok) {
        const newEntry = {
          id: Date.now(),
          name: newAddiction.trim(),
          startDate: startDate,
        };
        
        setAddictions([...addictions, newEntry]);
        setNewAddiction("");
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding addiction:', error);
    }
  };

  // Delete addiction
  const handleDeleteAddiction = async (id) => {
    const addiction = addictions.find(a => a.id === id);
    if (!addiction) return;

    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [addiction.name]: null // This will delete the field
        }),
      });

      if (response.ok) {
        setAddictions(addictions.filter(addiction => addiction.id !== id));
      }
    } catch (error) {
      console.error('Error deleting addiction:', error);
    }
  };

  // Reset addiction (restart the counter)
  const handleResetAddiction = async (id) => {
    const addiction = addictions.find(a => a.id === id);
    if (!addiction) return;

    try {
      const newStartDate = new Date().toISOString();
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [addiction.name]: newStartDate
        }),
      });

      if (response.ok) {
        setAddictions(addictions.map(addiction => 
          addiction.id === id 
            ? { ...addiction, startDate: newStartDate }
            : addiction
        ));
      }
    } catch (error) {
      console.error('Error resetting addiction:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <NavBar />
        <div style={{ color: "white", fontSize: "1.5rem" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "Arial, sans-serif"
    }}>
      <NavBar />
      
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header with Add Button */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "30px",
          padding: "0 10px"
        }}>
          <h1 style={{ 
            color: "white", 
            fontSize: "2.5rem", 
            fontWeight: "bold",
            margin: 0
          }}>
            Addiction Tracker
          </h1>
          <button
            onClick={() => setShowForm(true)}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "linear-gradient(45deg, #4CAF50, #45a049)",
              border: "none",
              color: "white",
              fontSize: "2rem",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.1)";
              e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
            }}
          >
            +
          </button>
        </div>

        {/* Add Addiction Form */}
        {showForm && (
          <div style={{
            background: "white",
            borderRadius: "15px",
            padding: "25px",
            marginBottom: "30px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            animation: "fadeIn 0.3s ease"
          }}>
            <h3 style={{ 
              margin: "0 0 15px 0", 
              color: "#333",
              fontSize: "1.3rem"
            }}>
              Add New Addiction to Track
            </h3>
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <input
                type="text"
                value={newAddiction}
                onChange={(e) => setNewAddiction(e.target.value)}
                placeholder="Enter addiction name (e.g., Smoking, Social Media, etc.)"
                style={{
                  flex: 1,
                  padding: "12px 15px",
                  borderRadius: "8px",
                  border: "2px solid #ddd",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border-color 0.3s ease"
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#ddd"}
                onKeyPress={(e) => e.key === 'Enter' && handleAddAddiction()}
              />
              <button
                onClick={handleAddAddiction}
                style={{
                  padding: "12px 25px",
                  borderRadius: "8px",
                  border: "none",
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  color: "white",
                  fontSize: "1rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
              >
                Add Addiction
              </button>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  padding: "12px 20px",
                  borderRadius: "8px",
                  border: "2px solid #ddd",
                  background: "white",
                  color: "#666",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = "#999";
                  e.target.style.color = "#333";
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = "#ddd";
                  e.target.style.color = "#666";
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Current Addictions */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ 
            color: "white", 
            fontSize: "1.8rem", 
            marginBottom: "20px",
            textAlign: "center"
          }}>
            Current Addictions ({addictions.length})
          </h2>
          
          {addictions.length === 0 ? (
            <div style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "15px",
              padding: "40px",
              textAlign: "center",
              color: "white",
              fontSize: "1.2rem"
            }}>
              <p>No addictions being tracked yet.</p>
              <p style={{ fontSize: "1rem", opacity: "0.8" }}>
                Click the + button to add your first addiction to track.
              </p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "20px"
            }}>
              {addictions.map((addiction) => {
                const timeSince = getTimeSince(addiction.startDate);
                return (
                  <div
                    key={addiction.id}
                    style={{
                      background: "white",
                      borderRadius: "15px",
                      padding: "25px",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      transition: "transform 0.3s ease",
                      cursor: "pointer"
                    }}
                    onMouseOver={(e) => e.target.style.transform = "translateY(-5px)"}
                    onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                      <h3 style={{ 
                        margin: 0, 
                        color: "#333",
                        fontSize: "1.4rem",
                        fontWeight: "bold"
                      }}>
                        {addiction.name}
                      </h3>
                      <button
                        onClick={() => handleDeleteAddiction(addiction.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ff4757",
                          fontSize: "1.2rem",
                          cursor: "pointer",
                          padding: "5px",
                          borderRadius: "5px",
                          transition: "background-color 0.3s ease"
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#ffe6e6"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                        title="Delete addiction"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(4, 1fr)", 
                      gap: "10px", 
                      marginBottom: "20px",
                      textAlign: "center"
                    }}>
                      <div>
                        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#667eea" }}>
                          {timeSince.days}
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "#666" }}>Days</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#667eea" }}>
                          {timeSince.hours}
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "#666" }}>Hours</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#667eea" }}>
                          {timeSince.minutes}
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "#666" }}>Minutes</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#667eea" }}>
                          {timeSince.seconds}
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "#666" }}>Seconds</div>
                      </div>
                    </div>
                    
                    <div style={{ 
                      fontSize: "0.9rem", 
                      color: "#666",
                      marginBottom: "15px",
                      textAlign: "center"
                    }}>
                      Started: {new Date(addiction.startDate).toLocaleString()}
                    </div>
                    
                    <button
                      onClick={() => handleResetAddiction(addiction.id)}
                      style={{
                        width: "100%",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        border: "none",
                        background: "linear-gradient(45deg, #ff6b6b, #ee5a52)",
                        color: "white",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                      onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
                    >
                      Reset Timer
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
