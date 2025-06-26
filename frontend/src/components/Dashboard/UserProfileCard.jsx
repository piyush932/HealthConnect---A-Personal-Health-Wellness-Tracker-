import React from 'react';
import { User } from 'lucide-react';

export default function UserProfile({
  name,
  age,
  weight,
  height,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-indigo-100 rounded-full p-3">
          <User className="h-16 w-16 text-indigo-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800">{name}</h2>
      <p className="text-gray-600 text-center mb-6">Fitness Enthusiast</p>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold text-indigo-600">{age}</p>
          <p className="text-gray-600">Age</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-indigo-600">{weight}</p>
          <p className="text-gray-600">Weight (kg)</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-indigo-600">{height}</p>
          <p className="text-gray-600">Height (cm)</p>
        </div>
      </div>
    </div>
  );
}
