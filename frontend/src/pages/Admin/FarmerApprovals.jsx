import { useEffect, useState } from 'react';

function FarmerApprovals() {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    // Fetch pending farmers from backend
    setFarmers([
      { id: 1, name: "Rahul Kumar", status: "Pending" },
      { id: 2, name: "Aditi Verma", status: "Pending" },
    ]);
  }, []);

  const approveFarmer = (id) => {
    setFarmers(farmers.filter(farmer => farmer.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Farmer Approvals</h1>
      <ul>
        {farmers.map(farmer => (
          <li key={farmer.id} className="border p-2 mb-2 rounded">
            {farmer.name} - {farmer.status} 
            <button 
              onClick={() => approveFarmer(farmer.id)} 
              className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
            >
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FarmerApprovals;
