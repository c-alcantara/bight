// import React, { useState } from 'react';

// function LimitSelector({ formData, setFormData }) {
//   const [limitIndex, setLimitIndex] = useState(0);
//   const limits = [100, 150, 200];

//   function handleLimitChange() {
//     const newIndex = (limitIndex + 1) % limits.length;
//     setLimitIndex(newIndex);
//     setFormData({ ...formData, limit: limits[newIndex] });
//   };

//   return (
//     <button
//       type="button"
//       className="mr-1.5 rounded-xl hover:scale-75 transition-transform duration-300 leading-5 ease-in-out font-bold bg-white px-4 py-2"
//       onClick={handleLimitChange}
//     >
//       {limits[limitIndex]}
//     </button>
//   );
// }

// export default LimitSelector;