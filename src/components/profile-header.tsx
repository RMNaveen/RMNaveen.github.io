import React from 'react';
import { Avatar, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTheme } from '@heroui/use-theme';
import { socialLinks } from '../data/portfolio-data';
import { useTranslation } from 'react-i18next';
import profileDark from '../assets/images/profile_dark.jfif';
import profilePurple from '../assets/images/profile_purple.png';
import profileLight from '../assets/images/profile_light.jpg';
import alternateImage from '../assets/images/profile_dark_ghibli.png'; // Add an alternate image

import { motion } from 'framer-motion';

const THEME_AVATARS = {
  dark: profileDark,
  purple: profilePurple,
  light: profileLight
} as const;

export const ProfileHeader = () => {
  const { theme, setTheme } = useTheme();
  const [avatarKey, setAvatarKey] = React.useState(Date.now());
  const [currentAvatar, setCurrentAvatar] = React.useState<string>(
    THEME_AVATARS[theme as keyof typeof THEME_AVATARS] || THEME_AVATARS.light
  );

  const { t } = useTranslation();

  React.useEffect(() => {
    setAvatarKey(Date.now());
    setCurrentAvatar(THEME_AVATARS[theme as keyof typeof THEME_AVATARS] || THEME_AVATARS.light);
  }, [theme]);

  // Set default theme to dark on first load
  React.useEffect(() => {
    if (!theme) {
      setTheme('dark');
    }
  }, [theme, setTheme]);

  const triggerAvatarChange = () => {
    // Temporarily change the avatar to the alternate image
    setAvatarKey(Date.now()); // Update the key to trigger animation
    setCurrentAvatar(alternateImage);

    // Switch back to the original avatar after 1.5 seconds
    setTimeout(() => {
      setAvatarKey(Date.now()); // Update the key again to trigger animation
      setCurrentAvatar(THEME_AVATARS[theme as keyof typeof THEME_AVATARS] || THEME_AVATARS.light);
    }, 1500); // Increased duration to 1.5 seconds
  };

  // Trigger avatar change on initial page load
  React.useEffect(() => {
    triggerAvatarChange();
  }, []); // Empty dependency array ensures this runs only once on mount

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-content1 rounded-lg">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={triggerAvatarChange} // Trigger avatar change on click
      >
        <motion.div
          key={avatarKey} // Use the dynamic key to trigger animation
          initial={{ rotateY: 0 }} // Start with no rotation
          animate={{ rotateY: 180 }} // Rotate 180 degrees for the flip effect
          exit={{ rotateY: 0 }} // Reset rotation on exit
          transition={{ duration: 0.5 }} // Animation duration for the flip
          style={{ perspective: 1000 }} // Add perspective for 3D effect
        >
          <Avatar
            src={currentAvatar} // Use the dynamic avatar state
            className="w-32 h-32 text-large cursor-pointer" // Add cursor pointer for interactivity
            isBordered
            color="primary"
            imgProps={{
              loading: "eager",
              crossOrigin: "anonymous"
            }}
          />
        </motion.div>
      </motion.div>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl font-bold mb-2">
          {t('header.title')}
        </h1>
        <p className="text-xl text-primary mb-2">
          {t('header.role')}
        </p>
        <p className="text-default-600 mb-4">
          {t('header.bio')}
        </p>

        <div className="mb-4 flex gap-8">
          <div className="flex flex-col items-center">
            <span className="font-bold">10+</span>
            <span className="text-default-500 text-sm">Projects</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">2.5+ Years</span>
            <span className="text-default-500 text-sm">Experience</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">3</span>
            <span className="text-default-500 text-sm">Publications</span>
          </div>
        </div>


        <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
          {socialLinks.map((link) => (
            <Button
              key={link.id}
              as="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="flat"
              startContent={<Icon icon={link.icon} className="text-xl" />}
            >
              {t(`social.${link.id}`)}
            </Button>
          ))}
        </div>
        <Button
          color="primary"
          variant="solid"
          size="lg"
          onPress={scrollToContact}
        >
          {t('header.contact')}
        </Button>
      </div>
    </div>
  );
};