import React from 'react';

const Error = ({ children }) => {
  return (
    <div className="bg-red-300 text-lg text-center font-black uppercase text-black mb-5">
      {children}
    </div>
  );
};

export default Error;
