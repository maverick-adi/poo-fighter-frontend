import React, { useState } from 'react';
import api from '../../api';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuthFromToken } = useAuth();
  const navigate = useNavigate();

  const sendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    try {
      await api.sendOtp({ email });
      setOtpSent(true);
    } catch (err) {
      console.error('sendOtp error', err);
      alert('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const res = await api.verifyOtp({ email, otp });
      const { token, user } = res.data;
      if (token) {
        setAuthFromToken(token, user);
        navigate('/pets');
      } else {
        alert('Invalid response from server');
      }
    } catch (err: any) {
      console.error('verify error', err);
      alert(err?.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        {!otpSent ? (
          <form onSubmit={sendOtp}>
            <h2 className="text-2xl font-semibold mb-4">Login or Signup</h2>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="w-full p-2 border rounded mb-4"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </Button>
          </form>
        ) : (
          <form onSubmit={verify}>
            <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
            <label className="block text-sm mb-1">OTP</label>
            <input
              className="w-full p-2 border rounded mb-4"
              type="text"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              <Button onClick={() => setOtpSent(false)} variant="secondary" type="button">
                Back
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}