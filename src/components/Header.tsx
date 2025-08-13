import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <i className="fas fa-home text-indigo-600"></i>
          {t('appTitle')}
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => changeLanguage('en')} className="text-gray-600 hover:text-indigo-600">EN</button>
          <button onClick={() => changeLanguage('ja')} className="text-gray-600 hover:text-indigo-600">JP</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
