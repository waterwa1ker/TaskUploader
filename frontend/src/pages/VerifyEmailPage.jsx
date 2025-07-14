import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../services/api';
import Alert from '../components/Alert';

function VerifyEmailPage() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      verifyEmail(token)
        .then(() => {
          setStatus('success');
          setMessage('Email successfully verified!');
        })
        .catch(() => {
          setStatus('error');
          setMessage('Invalid or expired verification link.');
        });
    } else {
      setStatus('error');
      setMessage('No verification token provided.');
    }
    // eslint-disable-next-line
  }, []); // <--- только при первом монтировании

  return (
    <div className="verify-email-page">
      <h1>Email Verification</h1>
      <Alert message={message} type={status === 'success' ? 'success' : 'error'} />
    </div>
  );
}

export default VerifyEmailPage;