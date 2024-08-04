import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-1/3 bg-white shadow-lg p-4 z-50">
      <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center text-center space-y-2 md:space-y-0 md:flex-row">
        <div className="w-full md:w-auto">
          <ul className="flex flex-wrap justify-center md:justify-start space-x-4">
            <li className="text-sm text-gray-600 hover:text-gray-900">
              <a href="#">About</a>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900">
              <a href="#">Help</a>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900">
              <a href="#">Press</a>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900">
              <a href="#">API</a>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900">
              <a href="#">Jobs</a>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900">
              <a href="#">Privacy</a>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900">
              <a href="#">Terms</a>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900">
              <a href="#">Locations</a>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900">
              <a href="#">Language</a>
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900">
              <a href="#">Meta Verified</a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-auto mt-2 md:mt-0">
          <p className="text-sm text-gray-600">
            © 2024 Instagram from Meta
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
