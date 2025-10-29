import React from 'react';

export default function SupportPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-neutral-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Support Center</h1>
      <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
        Need help with your order, account, or any issue? Reach out to our support team — we’re here
        to help 24/7.
      </p>

      <div className="mt-6 space-x-3">
        <a
          href="mailto:support@example.com"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Email Support
        </a>
        <a
          href="/contact"
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
        >
          Contact Form
        </a>
      </div>
    </div>
  );
}
