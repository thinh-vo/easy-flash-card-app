import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      style={{
        padding: '8px 16px',
        borderRadius: 20,
        background: '#ffb347',
        color: '#fff',
        fontWeight: 'bold',
        border: 'none',
        margin: 8,
        cursor: 'pointer',
      }}
      onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
      aria-label="Switch language"
    >
      {language === 'en' ? 'Tiếng Việt' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;
