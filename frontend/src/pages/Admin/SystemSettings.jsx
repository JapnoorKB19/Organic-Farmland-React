import { useState } from 'react';

function SystemSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">System Settings</h1>
      <label className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          checked={maintenanceMode} 
          onChange={() => setMaintenanceMode(!maintenanceMode)} 
        />
        <span>Enable Maintenance Mode</span>
      </label>
    </div>
  );
}

export default SystemSettings;
