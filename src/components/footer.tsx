import { Icon } from '@iconify/react';
import { Link } from '@heroui/react';
import { socialLinks } from '../data/portfolio-data';

export const Footer = () => {
  return (
    <footer className="bg-content1 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center gap-6 mb-6">
          {socialLinks.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              color="foreground"
            >
              <Icon icon={link.icon} className="text-2xl" />
            </Link>
          ))}
        </div>
        <p className="text-center text-default-500">
          © 2025 Naveen Rajagopal Mohanraj. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
