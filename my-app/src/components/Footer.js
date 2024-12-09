import React from 'react';
import { Link } from "react-router-dom";
import { 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  InformationCircleIcon 
} from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Legal Links */}
          <div className="flex justify-center md:justify-start space-x-4">
            <Link 
              to="/terms" 
              className="text-gray-600 hover:text-green-700 flex items-center space-x-2 transition-colors"
            >
              <DocumentTextIcon className="h-5 w-5" />
              <span className="text-sm">Conditions of Use</span>
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-600 hover:text-green-700 flex items-center space-x-2 transition-colors"
            >
              <ShieldCheckIcon className="h-5 w-5" />
              <span className="text-sm">Privacy Notice</span>
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex justify-center items-center space-x-2 text-gray-600">
            <InformationCircleIcon className="h-5 w-5" />
            <span className="text-sm">
              © {new Date().getFullYear()} Agricultural Services, Government Wing
            </span>
          </div>

          {/* Additional Links */}
          <div className="flex justify-center md:justify-end space-x-4">
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-green-700 text-sm transition-colors"
            >
              Contact Us
            </Link>
            <Link 
              to="/help" 
              className="text-gray-600 hover:text-green-700 text-sm transition-colors"
            >
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}