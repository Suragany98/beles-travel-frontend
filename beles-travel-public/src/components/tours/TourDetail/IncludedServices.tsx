import React from 'react';

interface IncludedServicesProps {
  included?: string;
  excluded?: string;
}

const IncludedServices: React.FC<IncludedServicesProps> = ({ included, excluded }) => {
  if (!included && !excluded) {
    return null;
  }

  const includedItems = included?.split('\n').filter(Boolean) || [];
  const excludedItems = excluded?.split('\n').filter(Boolean) || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Что включено</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Included */}
        {includedItems.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Включено в стоимость
            </h3>
            <ul className="space-y-3">
              {includedItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Excluded */}
        {excludedItems.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Не включено в стоимость
            </h3>
            <ul className="space-y-3">
              {excludedItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncludedServices;
