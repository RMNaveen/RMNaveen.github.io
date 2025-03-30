import React from 'react';
import { Tooltip, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: 'flag:gb-4x3'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: 'flag:fr-4x3'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: 'flag:es-4x3'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: 'flag:in-4x3'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    flag: 'flag:in-4x3'
  }
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        <Tooltip 
          content="Change Language"
          placement="left"
        >
          <Button
            isIconOnly
            variant="solid"
            color="primary"
            size="lg"
            className="rounded-full shadow-lg"
            onPress={() => setIsOpen(!isOpen)}
          >
            <Icon icon={currentLanguage.flag} className="text-2xl" />
          </Button>
        </Tooltip>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-full right-0 mb-4 bg-content1 rounded-lg shadow-xl overflow-hidden"
            >
              <div className="p-2 space-y-2 min-w-[200px]">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant="flat"
                    className={`w-full justify-start ${lang.code === currentLanguage.code ? 'bg-primary/20' : ''}`}
                    startContent={<Icon icon={lang.flag} className="text-xl" />}
                    onPress={() => handleLanguageChange(lang.code)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm">{lang.nativeName}</span>
                      <span className="text-xs text-default-500">{lang.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
