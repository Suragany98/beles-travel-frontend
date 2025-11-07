import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';

const TourDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Детали тура #{id}</h1>
        <p>Tour details will be here...</p>
      </main>
      <Footer />
    </div>
  );
};

export default TourDetailPage;
