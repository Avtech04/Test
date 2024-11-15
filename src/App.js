import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('progress'); // Manage which tab is active
  const lastUpdated = '15 Nov\'24 9:00 AM'; // You can update this dynamically as well

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

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
      
      <div className="swag-revealed-container">
        <img src="swag.jpeg" alt="Swag Revealed" className="swag-image" />
        <div className="swag-text">
          🎁 <span className="swag-revealed-title">Swags Revealed!</span> 🎉
        </div>
      </div>
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
    filteredData.map((row, index) => {
      // Check if the row meets the conditions
      const isHighlighted = 
        row['Access Code Redemption Status'] === 'Yes' &&
        row['All Skill Badges & Games Completed'] === 'Yes' &&
        row['# of Skill Badges Completed'] === 15 &&
        row['# of Arcade Games Completed'] === 1;

      return (
        <tr key={index} className={isHighlighted ? 'highlightRow' : (index % 2 === 0 ? 'evenRow' : 'oddRow')}>
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
      );
    })
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
  <div className="updates-content">
    <h2>Updates of Campaign</h2>
    
    <div className="syllabus-section">
      <h3>Syllabus for the Program</h3>
      <p>
        As part of the program, you'll learn concepts like computing, application development, big data & machine learning, 
        security, and AI using cloud. These are structured in exciting games, trivia, and skill badges. You can find the 
        complete campaign syllabus in the document here: 
        <a href="https://goo.gle/genaicontent" target="_blank" className="syllabus-link"> Campaign Syllabus</a>.
      </p>
      <p className="important-note">
        <strong>Note:</strong> All skill badges listed in the document are mandatory. Contributions to non-listed labs will not be 
        considered. Completing other skill badges may exhaust your allocated credits, and no additional credits will be provided.
      </p>
    </div>
    
    <div className="important-points-section">
      <h3>Important Points to Remember</h3>
      <ul className="important-points-list">
        <li><strong>Deadline:</strong> 11 November, 5 pm IST. Ensure you complete all labs and skill badges by this deadline.</li>
         <li><strong>Credits:</strong> Use your credits wisely. If you exhaust credits before completing labs, no additional credits will be provided.</li>
        <li><strong>Daily lab limit:</strong> Only 10 labs can be completed per day. Steady progress is encouraged.</li>
        <li><strong>Arcade game slots:</strong> If not enough slots for the Gen AI Arcade game are available, check back the next day.</li>
         <li><strong>Completion of listed labs:</strong> Plan accordingly, as only listed labs contribute towards rewards, with a 10-labs-per-day limit.</li>
        <li><strong>300 credits limit:</strong> No additional top-ups will be provided, so manage your credits wisely.</li>
           </ul>
    </div>
  </div>
)}

{activeTab === 'social' && (
  <div className="social-media-page">
    <h2>Follow Us on Social Media</h2>
    
    <div className="social-media-grid">
      <div className="social-media-card">
        <img src="insta-logo.webp" alt="Instagram" className="social-icon"/>
        <h3>Instagram</h3>
        <p>Stay updated with our latest posts and stories on Instagram!</p>
        <a href="https://www.instagram.com/gdgc.mnnit/" target="_blank" className="social-link">Follow on Instagram</a>
      </div>

      <div className="social-media-card">
        <img src="whatsapp-logo.webp" alt="WhatsApp" className="social-icon"/>
        <h3>WhatsApp</h3>
        <p>Join our community on WhatsApp for instant updates and conversations.</p>
        <a href="https://chat.whatsapp.com/GPnV5IstcKoD1RJqmVFpPi" target="_blank" className="social-link">Join WhatsApp Group</a>
      </div>

      <div className="social-media-card">
        <img src="linkedin-logo.webp" alt="LinkedIn" className="social-icon"/>
        <h3>LinkedIn</h3>
        <p>Connect with us professionally on LinkedIn and grow your network.</p>
        <a href="https://www.linkedin.com/company/gdsc-mnnit/" target="_blank" className="social-link">Connect on LinkedIn</a>
      </div>

      <div className="social-media-card">
        <img src="github-logo.webp" alt="GitHub" className="social-icon"/>
        <h3>GitHub</h3>
        <p>Contribute to our open-source projects and explore our code on GitHub.</p>
        <a href="https://github.com/gdsc-mnnita" target="_blank" className="social-link">Explore on GitHub</a>
      </div>
    </div>
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


