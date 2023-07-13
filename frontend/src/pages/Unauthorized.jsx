import React from "react";

function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md px-4 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Unauthorized Access</h2>
        <p className="text-gray-700">
          Sorry, you don't have permission to access this page.
        </p>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
