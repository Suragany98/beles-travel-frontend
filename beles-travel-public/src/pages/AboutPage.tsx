import React from 'react';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';
import { APP_NAME } from '../constants/config';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">О компании {APP_NAME}</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Мы создаем незабываемые путешествия по Казахстану с 2015 года
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Our Story */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Наша история</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-4">
                {APP_NAME} - это команда энтузиастов, влюбленных в красоту Казахстана. Мы начали свой путь в 2015 году
                с одной простой миссии: показать людям невероятные природные богатства нашей страны.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                За годы работы мы организовали сотни туров, побывали в самых удаленных уголках Казахстана и
                помогли тысячам путешественников открыть для себя новые горизонты.
              </p>
              <p className="text-lg text-gray-700">
                Сегодня мы гордимся тем, что являемся одной из ведущих туристических компаний в регионе,
                предлагающей качественные и безопасные путешествия для всех возрастов и уровней подготовки.
              </p>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Почему выбирают нас</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Опыт</h3>
                <p className="text-gray-600">
                  Более 9 лет успешной работы в туристической индустрии Казахстана
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Профессионализм</h3>
                <p className="text-gray-600">
                  Команда опытных гидов и инструкторов с лицензиями и сертификатами
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Безопасность</h3>
                <p className="text-gray-600">
                  Высокие стандарты безопасности и полное страхование всех участников
                </p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="bg-primary-50 rounded-lg p-12 mb-16">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">9+</div>
                <div className="text-gray-700">Лет опыта</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">5000+</div>
                <div className="text-gray-700">Довольных клиентов</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-gray-700">Уникальных маршрутов</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
                <div className="text-gray-700">Гарантия качества</div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Наша миссия</h2>
                <p className="text-gray-700">
                  Сделать путешествия по Казахстану доступными, безопасными и незабываемыми для каждого.
                  Мы стремимся показать красоту нашей страны и создать уникальный опыт для наших клиентов,
                  развивая при этом внутренний туризм и сохраняя природное наследие.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Наше видение</h2>
                <p className="text-gray-700">
                  Стать ведущей туристической компанией Казахстана, устанавливающей стандарты качества и
                  безопасности в индустрии. Мы хотим, чтобы каждый житель и гость нашей страны мог
                  легко и с удовольствием исследовать ее красоты вместе с нами.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
