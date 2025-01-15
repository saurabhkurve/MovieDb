import React, { useEffect } from 'react';

const Modal = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Close the modal after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#343A3F] p-6 rounded-lg shadow-lg transform transition-transform duration-300 scale-100 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-xl font-bold mb-4 text-white">Notice</h2>
        <p className="text-white">If the website is not working, try using a VPN.</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;