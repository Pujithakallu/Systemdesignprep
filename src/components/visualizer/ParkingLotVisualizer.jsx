import { useState } from 'react';
import VisualizerContainer from './VisualizerContainer';

export default function ParkingLotVisualizer() {
  const [spots, setSpots] = useState(
    Array(10).fill(null).map((_, i) => ({ id: i, isOccupied: false, vehicleType: null }))
  );
  const [logs, setLogs] = useState([]);

  const parkVehicle = (type) => {
    const emptySpotIndex = spots.findIndex(spot => !spot.isOccupied);
    if (emptySpotIndex !== -1) {
      const newSpots = [...spots];
      newSpots[emptySpotIndex] = { ...newSpots[emptySpotIndex], isOccupied: true, vehicleType: type };
      setSpots(newSpots);
      setLogs(prev => [`${type} parked at spot ${emptySpotIndex + 1}`, ...prev].slice(0, 5));
    } else {
      setLogs(prev => [`Parking Lot is Full! Cannot park ${type}`, ...prev].slice(0, 5));
    }
  };

  const leaveSpot = (index) => {
    if (spots[index].isOccupied) {
      const type = spots[index].vehicleType;
      const newSpots = [...spots];
      newSpots[index] = { ...newSpots[index], isOccupied: false, vehicleType: null };
      setSpots(newSpots);
      setLogs(prev => [`${type} left spot ${index + 1}`, ...prev].slice(0, 5));
    }
  };

  return (
    <VisualizerContainer title="Parking Lot System Simulation">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex gap-2 mb-6">
            <button 
              onClick={() => parkVehicle('Car')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Park Car 🚗
            </button>
            <button 
              onClick={() => parkVehicle('Motorcycle')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Park Bike 🏍️
            </button>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {spots.map((spot, i) => (
              <div 
                key={spot.id}
                onClick={() => leaveSpot(i)}
                className={`
                  h-20 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all
                  ${spot.isOccupied 
                    ? 'border-red-400 bg-red-50 dark:bg-red-900/20' 
                    : 'border-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100'}
                `}
              >
                <span className="text-xs text-gray-500 font-mono mb-1">P{i + 1}</span>
                <span className="text-2xl">
                  {spot.isOccupied ? (spot.vehicleType === 'Car' ? '🚗' : '🏍️') : 'P'}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 italic">*Click on an occupied spot to simulate a vehicle leaving</p>
        </div>

        <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
          <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 uppercase tracking-wider">System Logs</h4>
          <div className="space-y-2">
            {logs.length === 0 ? (
              <p className="text-sm text-gray-400 italic">System initialized. Waiting for vehicles...</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-sm text-gray-600 dark:text-gray-400 border-l-2 border-blue-500 pl-2 py-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </VisualizerContainer>
  );
}
