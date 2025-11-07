import React from 'react';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';
import Hero from '../components/home/Hero/Hero';
import FeaturedTours from '../components/home/FeaturedTours/FeaturedTours';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedTours />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
