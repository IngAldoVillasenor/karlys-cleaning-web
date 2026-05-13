"use server";

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Definimos el esquema de validación estricto
const formSchema = z.object({
  name: z.string().min(2, "Name is too short").max(60, "Name is too long").trim(),
  // Regex para teléfonos de USA: acepta (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
  phone: z.string().regex(/^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/, "Invalid US phone number format"),
  service: z.enum(['family-home', 'move-in-out', 'last-minute', 'special-occasion'], {
    message: "Please select a valid service"
  }),
  message: z.string().min(10, "Message is too short").max(1000, "Message is too long").trim(),
  recaptchaToken: z.string().min(1, "CAPTCHA verification is required")
});

// 2. Helper para sanitizar strings y evitar inyección HTML (XSS)
function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendEmailForm(formData: FormData) {
  // Extraemos los datos crudos
  const rawData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    service: formData.get('service'),
    message: formData.get('message'),
    recaptchaToken: formData.get('recaptchaToken'),
  };

  // 3. Pasamos los datos por el validador de Zod
  const validatedFields = formSchema.safeParse(rawData);

  if (!validatedFields.success) {
    // Si falla, devolvemos los mensajes de error exactos al frontend
    return { 
      success: false, 
      errors: validatedFields.error.flatten().fieldErrors,
      error: 'Please fix the errors below.' 
    };
  }

  // Si llegamos aquí, los datos son seguros y tienen el formato correcto
  const { name, phone, service, message, recaptchaToken } = validatedFields.data;

  try {
    // Verificación de reCAPTCHA
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const recaptchaRes = await fetch(verifyUrl, { method: 'POST' });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return { success: false, error: 'CAPTCHA verification failed. Please try again.' };
    }

    // 4. Sanitizamos la información antes de inyectarla en el HTML
    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);

    const { data, error } = await resend.emails.send({
      from: 'Website Form <website@karlyscleaning.com>',
      to: ['contact@karlyscleaning.com'], 
      subject: `New cleaning quote request from: ${safeName}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Type of Service:</strong> ${service}</p>
        <p><strong>Details:</strong><br/> ${safeMessage}</p>
      `,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Internal server error. Please try later.' };
  }
}