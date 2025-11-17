import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { contactApi } from '@/services/api/contactApi';
import { ContactMessage } from '@/types/common.types';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Введите полное имя (минимум 2 символа)'),
  email: z.string().email('Неверный формат email'),
  phone: z.string().regex(/^\+7\d{10}$/, 'Формат: +7XXXXXXXXXX'),
  subject: z.string().min(3, 'Введите тему сообщения'),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm: React.FC = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: (data: ContactMessage) => contactApi.sendMessage(data),
    onSuccess: () => {
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Ошибка при отправке сообщения');
    },
  });

  const onSubmit = (data: ContactFormData) => {
    sendMessage(data);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Отправить сообщение</h2>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700">
            Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Полное имя *
          </label>
          <input
            {...register('fullName')}
            type="text"
            id="fullName"
            className="input"
            placeholder="Иванов Иван Иванович"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email and Phone */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="input"
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Телефон *
            </label>
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              className="input"
              placeholder="+77001234567"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Тема сообщения *
          </label>
          <input
            {...register('subject')}
            type="text"
            id="subject"
            className="input"
            placeholder="Вопрос о туре / Консультация / Другое"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Сообщение *
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={5}
            className="input"
            placeholder="Напишите ваше сообщение..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full btn-primary text-lg py-3"
        >
          {isPending ? 'Отправка...' : 'Отправить сообщение'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
