
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img className="h-10 w-auto" src="https://www.gstatic.com/devrel-devsite/prod/vbd4700e57c138563a3dafa423c0c62b48f7823c45ce6f9a39b2bf2be2f42a15a/cloud/images/cloud-logo.svg" alt="Google Cloud Logo" />
            <h1 className="ml-4 text-2xl font-bold text-gray-800">
              Data Migration Planner
            </h1>
          </div>
          <div className="text-sm text-gray-500 font-medium">Powered by Gemini</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
