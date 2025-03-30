import React from 'react';
import { Input, Textarea, Button } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import emailjs from 'emailjs-com';

export const ContactForm = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs.send('service_g49ihzd', 'template_4v3u0if', templateParams, '5tNEif6rXnNsnjDV7')
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        // Clear the form
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-content1 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">{t('contact.title')}</h2>
        <div className="flex flex-col gap-4">
          <Input
            label={t('contact.name')}
            placeholder={t('contact.namePlaceholder')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label={t('contact.email')}
            placeholder={t('contact.emailPlaceholder')}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Textarea
            label={t('contact.message')}
            placeholder={t('contact.messagePlaceholder')}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
          <Button type="submit" color="primary">
            {t('contact.submit')}
          </Button>
        </div>
      </form>
    </>
  );
};
