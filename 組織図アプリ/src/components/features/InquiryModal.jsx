import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InquiryModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch('http://localhost:3001/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, content })
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setName('');
          setEmail('');
          setContent('');
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Inquiry submission failed', error);
      alert('送信に失敗しました。ローカルサーバーが起動しているか確認してください。');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="inquiry-panel glass"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="inquiry-header">
              <h2>お問い合わせ・エラー報告</h2>
              <button className="close-btn" onClick={onClose}>&times;</button>
            </div>

            {isSuccess ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <p>送信が完了しました。<br/>ご協力ありがとうございます。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="inquiry-form">
                <div className="form-group">
                  <label>お名前</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    placeholder="氏名を入力"
                    className="edit-input"
                  />
                </div>
                <div className="form-group">
                  <label>メールアドレス (任意)</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="example@konoike.com"
                    className="edit-input"
                  />
                </div>
                <div className="form-group">
                  <label>内容 / エラー報告</label>
                  <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required 
                    placeholder="不具合の状況やご要望をご記入ください"
                    className="edit-input"
                    rows="5"
                  />
                </div>
                <button type="submit" className="save-btn" disabled={isSending}>
                  {isSending ? '送信中...' : '送信する'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InquiryModal;
