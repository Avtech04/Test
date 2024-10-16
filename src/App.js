import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('progress'); // Manage which tab is active
  const lastUpdated = '16 Oct\'24 12:30 PM'; // You can update this dynamically as well

  const [isModalOpen, setIsModalOpen] = useState(true); // State for modal

  useEffect(() => {
    fetch('/cleaned_data.json')
      .then(response => response.json())
      .then(json => setData(json))
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  const getStatusClass = (status) => {
    return status === 'Yes' ? 'statusButton yellowButton' : 'statusButton redButton';
  };

  const getArcadeClass = (games) => {
    return games === 1 ? 'statusButton yellowButton' : 'statusButton redButton';
  };

  const filteredData = data.filter((row) =>
    row['User Name'].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return  (
    <div className="App">
      {/* Modal Popup */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <h2>Have you registered for the <strong>Build with AI</strong> event?</h2>
            <p>If not, register now!</p>
            <a href="https://gdg.community.dev/e/m5kkvt/" className="register-button">Register Now</a>
          </div>
        </div>
      )}

      {/* Simplified Navigation Bar */}
      <header className="header">
  <img src="/logo.jpg" alt="Logo" className="header-logo" />
  
  <div className="header-title">
    <h1>GenAI Study Jams</h1>
  </div>
  
  <div className="last-updated">
    Last Updated: {lastUpdated}
  </div>
</header>

      <div>
        {/* Tab Buttons */}
        <div className="tab-buttons">
          <button className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => setActiveTab('progress')}>
            Progress Report
          </button>
          <button className={`tab-button ${activeTab === 'updates' ? 'active' : ''}`} onClick={() => setActiveTab('updates')}>
            Updates of Campaign
          </button>
          <button className={`tab-button ${activeTab === 'social' ? 'active' : ''}`} onClick={() => setActiveTab('social')}>
            Social Media Handles
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'progress' && (
            <div>
              <h1>Progress Report</h1>
              <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="searchBar"
              />

              <table>
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Access Code Redemption Status</th>
                    <th>All Skill Badges & Games Completed</th>
                    <th>Number of Skill Badges Completed</th>
                    <th>Number of Arcade Games Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'evenRow' : 'oddRow'}>
                        <td>{row['User Name']}</td>
                        <td>
                          <span className={getStatusClass(row['Access Code Redemption Status'])}>
                            {row['Access Code Redemption Status']}
                          </span>
                        </td>
                        <td>
                          <span className={getStatusClass(row['All Skill Badges & Games Completed'])}>
                            {row['All Skill Badges & Games Completed']}
                          </span>
                        </td>
                        <td>{row['# of Skill Badges Completed']}</td>
                        <td>
                          <span className={getArcadeClass(row['# of Arcade Games Completed'])}>
                            {row['# of Arcade Games Completed']}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No matching records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'updates' && (
            <div>
              <h2>Updates of Campaign</h2>
              {/* Updates content */}
            </div>
          )}

          {activeTab === 'social' && (
            <div>
              <h2>Social Media Handles</h2>
              {/* Social media content */}
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>Developed by <strong>varshney__ayush</strong></p>
      </footer>
    </div>
  );
}

export default App;
