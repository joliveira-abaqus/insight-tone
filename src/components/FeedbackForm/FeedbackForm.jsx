import React, { useState } from 'react';
import { validateFeedbackInput } from '../../utils/helpers.js';
import { UI_MESSAGES, VALIDATION_RULES } from '../../utils/constants.js';
import styles from './FeedbackForm.module.css';

/**
 * FeedbackForm Component
 * Provides the data-entry card for user feedback input
 * Includes validation and character counting
 */
const FeedbackForm = ({ onSubmit, feedbackInput, onInputChange, disabled, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleTextChange = (e) => {
    const text = e.target.value;
    onInputChange(text);
    
    // Clear validation errors when user starts typing
    if (validationError) {
      setValidationError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear any existing validation errors
    setValidationError('');
    
    // Validate input
    const validation = validateFeedbackInput(feedbackInput);
    if (!validation.isValid) {
      setValidationError(validation.message);
      
      // Focus the textarea for user convenience
      const textarea = document.getElementById('feedback');
      if (textarea) {
        textarea.focus();
      }
      return;
    }
    
    onSubmit(feedbackInput);
  };

  const characterCount = feedbackInput.length;
  const isNearLimit = characterCount > VALIDATION_RULES.MAX_FEEDBACK_LENGTH * 0.9;
  const isAtLimit = characterCount >= VALIDATION_RULES.MAX_FEEDBACK_LENGTH;
  const canSubmit = characterCount >= VALIDATION_RULES.MIN_FEEDBACK_LENGTH && !disabled;

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`${styles.feedbackCard} ${isFocused ? styles.focused : ''}`}>
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Analyze User Feedback
            </h1>
            <p className="text-slate-600">
              Paste user feedback below to generate sentiment analysis and categorize issues.
              Get insights in seconds to make data-driven product decisions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-slate-700 mb-2">
                Feedback Text
              </label>
              <div className="relative">
                <textarea
                  id="feedback"
                  value={feedbackInput}
                  onChange={handleTextChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={UI_MESSAGES.FEEDBACK_PLACEHOLDER}
                  className={`${styles.textarea} ${isFocused ? styles.textareaFocused : ''}`}
                  rows={8}
                  maxLength={VALIDATION_RULES.MAX_FEEDBACK_LENGTH}
                  disabled={disabled}
                  aria-describedby="feedback-help feedback-error"
                  aria-label="Feedback text input"
                  aria-required="true"
                  aria-invalid={!!(error || validationError)}
                />
                
                {/* Character counter */}
                <div className="absolute bottom-3 right-3">
                  <span className={`text-xs font-medium ${
                    isAtLimit ? 'text-red-600' : 
                    isNearLimit ? 'text-yellow-600' : 
                    'text-slate-500'
                  }`}>
                    {characterCount} / {VALIDATION_RULES.MAX_FEEDBACK_LENGTH}
                  </span>
                </div>
              </div>
              
              {/* Help text */}
              <p id="feedback-help" className="mt-2 text-sm text-slate-500">
                Enter at least {VALIDATION_RULES.MIN_FEEDBACK_LENGTH} characters for accurate analysis.
              </p>
              
              {/* Validation errors */}
              {(error || validationError) && (
                <div id="feedback-error" className="mt-2">
                  <p className="text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error || validationError}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">
                <p>
                  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Analysis typically takes 2 seconds
                </p>
              </div>
              
              <button
                type="submit"
                disabled={!canSubmit || disabled}
                className={`${styles.submitButton} ${canSubmit && !disabled ? styles.buttonEnabled : styles.buttonDisabled}`}
                aria-describedby="submit-help"
              >
                {disabled ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {UI_MESSAGES.GENERATE_INSIGHTS}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick tips */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Quick Tips</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Include specific details about user experiences</li>
              <li>• Paste multiple feedback items for comprehensive analysis</li>
              <li>• Include both positive and negative feedback for balance</li>
              <li>• Analysis works best with 50+ characters of text</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;