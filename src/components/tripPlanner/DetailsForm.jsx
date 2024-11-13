import { useState } from 'react';
import { Calendar, Banknote, MapPin, Clock, Utensils, Bus } from 'lucide-react';

const formatTripPlan = (text) => {
  // Initialize sections object
  const formattedSections = {
    'Accommodation:': [],
    'Daily Itinerary:': [],
    'Estimated Costs:': [],
    'Local Transportation Tips:': [],
    'Restaurant Recommendations:': []
  };
  
  // Split the text into lines
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  
  let currentSection = '';
  let currentDay = null;
  
  lines.forEach(line => {
    // Check if line is a section header
    const isSectionHeader = Object.keys(formattedSections).some(header => 
      line.toLowerCase().includes(header.toLowerCase().replace(':', ''))
    );
    
    if (isSectionHeader) {
      currentSection = Object.keys(formattedSections).find(header => 
        line.toLowerCase().includes(header.toLowerCase().replace(':', ''))
      );
      return;
    }
    
    if (!currentSection) return;
    
    // Handle daily itinerary specially
    if (currentSection === 'Daily Itinerary:') {
      if (line.toLowerCase().startsWith('day')) {
        currentDay = line;
        formattedSections[currentSection].push({ day: currentDay, activities: [] });
      } else if (currentDay && line.trim()) {
        const lastDay = formattedSections[currentSection][formattedSections[currentSection].length - 1];
        if (lastDay) {
          lastDay.activities.push(line.replace(/^[-•*]\s*/, '').trim());
        }
      }
    } else {
      // Remove bullet points and trim
      const cleanedLine = line.replace(/^[-•*]\s*/, '').trim();
      if (cleanedLine) {
        formattedSections[currentSection].push(cleanedLine);
      }
    }
  });
  
  return formattedSections;
};

const TripSection = ({ title, icon, children }) => (
  <div className="mb-8 bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center mb-4 border-b pb-2">
      {icon}
      <h3 className="text-xl font-semibold ml-2">{title}</h3>
    </div>
    {children}
  </div>
);

export default function TripPlanner() {
  const [formData, setFormData] = useState({
    destination: '',
    budget: 'medium',
    num_people: '',
    num_days: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/trip-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate trip plan');
      }
      
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderTripPlan = (tripPlan) => {
    const sections = formatTripPlan(tripPlan);
    
    return (
      <div className="space-y-6">
        {/* Title Section */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Your Personalized Trip Plan
          </h1>
          <p className="text-blue-700">
            {formData.num_days} Days in {formData.destination} for {formData.num_people} People
          </p>
        </div>

        {/* Accommodation Section */}
        {sections['Accommodation:'].length > 0 && (
          <TripSection title="Accommodation" icon={<MapPin className="w-6 h-6 text-blue-500" />}>
            <ul className="space-y-2">
              {sections['Accommodation:'].map((hotel, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2" />
                  <span>{hotel}</span>
                </li>
              ))}
            </ul>
          </TripSection>
        )}

        {/* Daily Itinerary Section */}
        {sections['Daily Itinerary:'].length > 0 && (
          <TripSection title="Daily Itinerary" icon={<Calendar className="w-6 h-6 text-green-500" />}>
            {sections['Daily Itinerary:'].map((dayData, index) => (
              <div key={index} className="mb-6">
                <h4 className="font-semibold text-lg mb-2 text-green-700">{dayData.day}</h4>
                <ul className="space-y-2 pl-4">
                  {dayData.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start">
                      <Clock className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </TripSection>
        )}

        {/* Estimated Costs Section */}
        {sections['Estimated Costs:'].length > 0 && (
          <TripSection title="Estimated Costs" icon={<Banknote className="w-6 h-6 text-purple-500" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections['Estimated Costs:'].map((cost, index) => (
                <div key={index} className="bg-purple-50 rounded-lg p-4">
                  <p className="text-purple-900">{cost}</p>
                </div>
              ))}
            </div>
          </TripSection>
        )}

        {/* Transportation Tips Section */}
        {sections['Local Transportation Tips:'].length > 0 && (
          <TripSection title="Transportation Tips" icon={<Bus className="w-6 h-6 text-orange-500" />}>
            <ul className="space-y-2">
              {sections['Local Transportation Tips:'].map((tip, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-orange-500 mt-2 mr-2" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </TripSection>
        )}

        {/* Restaurant Recommendations Section */}
        {sections['Restaurant Recommendations:'].length > 0 && (
          <TripSection title="Restaurant Recommendations" icon={<Utensils className="w-6 h-6 text-red-500" />}>
            <ul className="space-y-2">
              {sections['Restaurant Recommendations:'].map((restaurant, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-2 mr-2" />
                  <span>{restaurant}</span>
                </li>
              ))}
            </ul>
          </TripSection>
        )}
      </div>
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">AI Trip Planner</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">
            Destination
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Budget
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Number of People
          </label>
          <input
            type="number"
            name="num_people"
            value={formData.num_people}
            onChange={handleChange}
            min="1"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Number of Days
          </label>
          <input
            type="number"
            name="num_days"
            value={formData.num_days}
            onChange={handleChange}
            min="1"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Generating Plan...' : 'Generate Trip Plan'}
        </button>
      </form>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {result && (
        <div className="space-y-6">
          {result.image_url && (
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={result.image_url}
                alt={result.destination}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          
          {renderTripPlan(result.trip_plan)}
        </div>
      )}
    </div>
  );
}