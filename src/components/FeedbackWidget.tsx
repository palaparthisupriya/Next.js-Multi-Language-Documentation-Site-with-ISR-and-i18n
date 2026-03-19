'use client';

import * as React from 'react';
import {useState} from 'react';
import {toast} from 'react-hot-toast';
import {useTranslations} from 'next-intl';

export default function FeedbackWidget() {
  const t = useTranslations('Navigation');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    // Simulate submission
    setSubmitted(true);
    toast.success(t('success'));
    setFeedback('');
  };

  return (
    <div className="border-t py-6 mt-12">
      <h3 className="text-lg font-semibold mb-4">{t('feedback')}</h3>
      {submitted ? (
        <div data-testid="feedback-success-message" className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
          {t('success')}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <textarea
            data-testid="feedback-input"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Tell us what you think..."
            required
          />
          <button
            type="submit"
            data-testid="feedback-submit"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            {t('submit')}
          </button>
        </form>
      )}
    </div>
  );
}
