/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
      './storage/framework/views/*.php',
      './resources/views/**/*.blade.php',
      './resources/js/**/*.jsx',
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            light: '#3b82f6',
            DEFAULT: '#2563eb',
            dark: '#1d4ed8',
          },
          text: {
            DEFAULT: '#1f2937',
            light: '#4b5563',
            muted: '#6b7280',
          },
          surface: {
            light: '#f9fafb',
            DEFAULT: '#ffffff',
            hover: '#f3f4f6',
          },
        },
        borderRadius: {
          'standard': '0.375rem',
        },
        boxShadow: {
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        backgroundImage: {
          'gradient-header': 'linear-gradient(to right, var(--tw-gradient-stops))',
        },
        container: {
          center: true,
          padding: {
            DEFAULT: '1rem',
            sm: '2rem',
            lg: '4rem',
            xl: '5rem',
          },
        },
      },
    },
    plugins: [require('@tailwindcss/forms')],
  }
