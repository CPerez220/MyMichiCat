import React from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';

const QRCodePage = () => {
  const { id } = useParams(); // Fetch profile ID from URL

  const profileLink = `https://mymichicat.com/api/profile/${id}`; // Example link

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">QR Code for Profile {id}</h1>
      <div className="bg-white p-6 shadow-md rounded-md flex flex-col items-center">
        <QRCode value={profileLink} size={200} />
        <p className="text-gray-700 mt-4">{profileLink}</p>
        <button
          onClick={() => navigator.clipboard.writeText(profileLink)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md mt-4"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default QRCodePage;