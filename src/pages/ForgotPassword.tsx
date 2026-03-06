import React, { useState } from 'react';
import { BookOpen, Mail, ArrowLeft } from 'lucide-react';
import styles from '../styles/Login.module.css'; // Reusing your beautiful styles!
// import { API } from "../config/api";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch( 'http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Success! Check your email for the reset link.");
      } else {
        setError(data.msg || "Something went wrong.");
      }
    } catch (err) {
      setError("Server is not responding.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logo} onClick={() => window.location.href='/'} style={{ cursor: 'pointer' }}>
          <BookOpen size={24} />
          <span>E-Study</span>
        </div>
      </nav>

      <main className={styles.mainContent}>
        <div className={styles.formWrapper} style={{ justifyContent: 'center' }}>
          <div className={styles.formSection} style={{ maxWidth: '500px', width: '100%' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', cursor: 'pointer' }} onClick={() => window.location.href='/Login'}>
              <ArrowLeft size={20} /> <span style={{ fontWeight: 600 }}>Back to Login</span>
            </div>

            <h2 className={styles.formTitle}>Reset Password</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>

            {message && <p style={{ color: '#7CA152', background: '#f0f9eb', padding: '10px', borderRadius: '8px', marginBottom: '15px' }}>{message}</p>}
            {error && <p style={{ color: '#ff4d4d', background: '#fff5f5', padding: '10px', borderRadius: '8px', marginBottom: '15px' }}>{error}</p>}

            <form className={styles.loginForm} onSubmit={handleForgot}>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.fieldIcon} size={20} />
                  <input 
                    type="email" 
                    placeholder="Enter your Email" 
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className={styles.loginBtn}>Send Reset Link</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;