import React, { useState } from 'react';
import { 
  Shield, 
  FileText, 
  DollarSign, 
  InfoIcon, 
  ChevronDown, 
  Search 
} from 'lucide-react';

// Mock data for government schemes (would typically come from a backend)
const governmentSchemes = [
  {
    id: 'pm-kisan',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    shortCode: 'PM-KISAN',
    description: 'Direct income support scheme for small and marginal farmers',
    benefits: [
      'Financial assistance of ₹6,000 per year',
      'Direct bank transfer in three equal installments',
      'Applicable for landholding farmers families'
    ],
    eligibilityCriteria: [
      'Small and marginal farmers',
      'Landholding family with cultivable land',
      'Excluding institutional landholders'
    ],
    documentRequirements: [
      'Aadhaar Card',
      'Land ownership documents',
      'Bank account details'
    ],
    applicationProcess: [
      'Register online at pm-kisan.gov.in',
      'Fill application form',
      'Upload required documents',
      'Verification by local authorities'
    ],
    websiteLink: 'https://pmkisan.gov.in/',
    contactNumber: '1800-120-0000'
  },
  {
    id: 'pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    shortCode: 'PMFBY',
    description: 'Crop insurance scheme providing comprehensive risk coverage',
    benefits: [
      'Low premium rates for farmers',
      'Complete crop loss coverage',
      'Comprehensive risk insurance from pre-sowing to post-harvest'
    ],
    eligibilityCriteria: [
      'All farmers growing notified crops',
      'Loanee and non-loanee farmers',
      'Covers both Kharif and Rabi crops'
    ],
    documentRequirements: [
      'Land ownership certificate',
      'Aadhaar Card',
      'Bank account details',
      'Crop details'
    ],
    applicationProcess: [
      'Apply through bank or online portal',
      'Select crops to be insured',
      'Pay nominal premium',
      'Claim compensation for losses'
    ],
    websiteLink: 'https://pmfby.gov.in/',
    contactNumber: '1800-180-1551'
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card (KCC)',
    shortCode: 'KCC',
    description: 'Comprehensive credit support for farmers\' agricultural needs',
    benefits: [
      'Affordable agricultural loans',
      'Credit for farm inputs and maintenance',
      'Flexible repayment options'
    ],
    eligibilityCriteria: [
      'Farmers with agricultural land',
      'Tenant farmers and sharecroppers',
      'Individuals and joint borrowers'
    ],
    documentRequirements: [
      'Land ownership documents',
      'Aadhaar Card',
      'Income proof',
      'Bank account details'
    ],
    applicationProcess: [
      'Approach nearest bank branch',
      'Fill KCC application',
      'Submit required documents',
      'Undergo credit assessment'
    ],
    websiteLink: 'https://www.nabard.org/',
    contactNumber: '1800-242-242'
  }
];

const GovernmentSchemesPortal = () => {
  const [activeScheme, setActiveScheme] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter schemes based on search term
  const filteredSchemes = governmentSchemes.filter(scheme => 
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-green-700 flex items-center justify-center">
          <Shield className="mr-3" /> Farmer Government Schemes
        </h1>
        <p className="text-gray-600 mt-2">
          Comprehensive support programs for agricultural development
        </p>
      </header>

      {/* Search Bar */}
      <div className="mb-6 flex items-center">
        <div className="relative w-full">
          <input 
            type="text"
            placeholder="Search schemes by name or code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg pl-10"
          />
         
        </div>
      </div>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map(scheme => (
          <div 
            key={scheme.id} 
            className="border rounded-lg overflow-hidden"
          >
            {/* Scheme Header */}
            <div 
              onClick={() => setActiveScheme(activeScheme === scheme.id ? null : scheme.id)}
              className="flex justify-between items-center p-4 bg-green-100 cursor-pointer hover:bg-green-200"
            >
              <div>
                <h2 className="text-xl font-semibold text-green-800">
                  {scheme.name}
                </h2>
                <span className="text-sm text-green-600">
                  ({scheme.shortCode})
                </span>
              </div>
              <ChevronDown 
                className={`transform transition-transform ${
                  activeScheme === scheme.id ? 'rotate-180' : ''
                }`} 
              />
            </div>

            {/* Scheme Details */}
            {activeScheme === scheme.id && (
              <div className="p-4 bg-white">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Description and Benefits */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <InfoIcon className="mr-2 text-blue-500" /> Description
                    </h3>
                    <p className="text-gray-700 mb-4">{scheme.description}</p>

                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <DollarSign className="mr-2 text-green-500" /> Benefits
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {scheme.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility and Application */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Eligibility Criteria
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                      {scheme.eligibilityCriteria.map((criteria, index) => (
                        <li key={index}>{criteria}</li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">
                      Document Requirements
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                      {scheme.documentRequirements.map((doc, index) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>

                    <div className="bg-green-50 p-3 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">
                        Application Process
                      </h3>
                      <ol className="list-decimal list-inside text-gray-700 space-y-1">
                        {scheme.applicationProcess.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>

                      <div className="mt-4 flex justify-between items-center">
                        <a 
                          href={scheme.websiteLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          <FileText className="inline mr-1" /> Official Website
                        </a>
                        <div className="text-green-700">
                          <FileText className="inline mr-1" /> Helpline: {scheme.contactNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredSchemes.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          <Shield className="mx-auto mb-4" />
          No government schemes found. Try a different search term.
        </div>
      )}
    </div>
  );
};

export default GovernmentSchemesPortal;