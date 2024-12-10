import React, { useState } from 'react';
import { 
  Book, 
  File, 
  Download, 
  FileText, 
  Video, 
  Newspaper, 
  HelpCircle, 
  ChevronDown, 
} from 'lucide-react';

// Mock data for resources (would typically come from a backend)
const resourceCategories = [
  {
    id: 'crop-guides',
    name: 'Crop Cultivation Guides',
    resources: [
      {
        id: 'wheat-cultivation',
        title: 'Comprehensive Wheat Cultivation Guide',
        type: 'pdf',
        description: 'Detailed guide covering wheat cultivation techniques, best practices, and modern agricultural methods.',
        downloadLink: '/resources/wheat-guide.pdf',
        tags: ['Wheat', 'Rabi Crops', 'Cultivation']
      },
      {
        id: 'rice-farming',
        title: 'Advanced Rice Farming Techniques',
        type: 'pdf',
        description: 'Modern approaches to rice cultivation, irrigation, and sustainable farming practices.',
        downloadLink: '/resources/rice-farming.pdf',
        tags: ['Rice', 'Kharif Crops', 'Sustainable Farming']
      }
    ]
  },
  {
    id: 'government-schemes',
    name: 'Government Agricultural Schemes',
    resources: [
      {
        id: 'pm-kisan',
        title: 'PM-KISAN Scheme Details',
        type: 'document',
        description: 'Comprehensive information about the Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) scheme.',
        downloadLink: '/resources/pm-kisan-scheme.pdf',
        tags: ['Government Scheme', 'Financial Aid', 'Farmer Welfare']
      },
      {
        id: 'crop-insurance',
        title: 'Crop Insurance Scheme Guide',
        type: 'document',
        description: 'Complete guide to crop insurance, application process, and benefits.',
        downloadLink: '/resources/crop-insurance-guide.pdf',
        tags: ['Insurance', 'Risk Management', 'Financial Protection']
      }
    ]
  },
  {
    id: 'training-videos',
    name: 'Training and Educational Videos',
    resources: [
      {
        id: 'soil-health',
        title: 'Maintaining Soil Health and Fertility',
        type: 'video',
        description: 'Expert-led video on soil testing, nutrient management, and sustainable soil practices.',
        downloadLink: '/resources/soil-health-video.mp4',
        tags: ['Soil Management', 'Agriculture', 'Education']
      },
      {
        id: 'modern-farming',
        title: 'Introduction to Modern Farming Techniques',
        type: 'video',
        description: 'Comprehensive overview of modern agricultural technologies and precision farming.',
        downloadLink: '/resources/modern-farming-techniques.mp4',
        tags: ['Technology', 'Innovation', 'Farming Techniques']
      }
    ]
  }
];

const FarmerResourcesPortal = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Icon mapping for resource types
  const resourceTypeIcons = {
    'pdf': <File className="text-red-500" />,
    'document': <FileText className="text-blue-500" />,
    'video': <Video className="text-green-500" />
  };

  // Search and filter resources
  const filteredResources = resourceCategories.map(category => ({
    ...category,
    resources: category.resources.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.resources.length > 0);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-green-700 flex items-center justify-center">
          <Book className="mr-3" /> Farmer Resources & Documentation Portal
        </h1>
        <p className="text-gray-600 mt-2">
          Comprehensive resources to support agricultural knowledge and growth
        </p>
      </header>

      {/* Search Bar */}
      <div className="mb-6 flex items-center">
        
        <div className="relative w-full">
          <input 
            type="text"
            placeholder="Search resources by title or tags"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg pl-10"
          />
          
        </div>
      </div>

      {/* Resources Categories */}
      <div className="space-y-6">
        {filteredResources.map(category => (
          <div key={category.id} className="border rounded-lg">
            <div 
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer hover:bg-gray-200"
            >
              <h2 className="text-xl font-semibold text-green-600 flex items-center">
                <HelpCircle className="mr-2" /> {category.name}
              </h2>
              <ChevronDown 
                className={`transform transition-transform ${
                  activeCategory === category.id ? 'rotate-180' : ''
                }`} 
              />
            </div>

            {activeCategory === category.id && (
              <div className="p-4 grid md:grid-cols-2 gap-4">
                {category.resources.map(resource => (
                  <div 
                    key={resource.id} 
                    className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {resource.title}
                      </h3>
                      {resourceTypeIcons[resource.type]}
                    </div>
                    <p className="text-gray-600 mb-2">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {resource.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={resource.downloadLink} 
                        download
                        className="text-blue-500 hover:text-blue-700 flex items-center"
                      >
                        <Download className="mr-1" /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          <Newspaper className="mx-auto mb-4" />
          No resources found. Try a different search term.
        </div>
      )}
    </div>
  );
};

export default FarmerResourcesPortal;