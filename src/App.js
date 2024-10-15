import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="App">
      {/* Simplified Navigation Bar */}
      <nav className="navbar">
  <div className="logo">
    <img src="/logo.jpg" alt="Logo" />
  </div>
  <div className="status">
    <span>Last Updated: 15 Oct'24 09:00 AM</span>
  </div>
</nav>


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
            <th># of Skill Badges Completed</th>
            <th># of Arcade Games Completed</th>
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
  );
}

export default App;
