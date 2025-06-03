import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Helper to detect if a word is English (very basic, can be improved)
const isEnglish = (word: string) => /^[a-zA-Z\s]+$/.test(word);

const FlashcardForm: React.FC<{ onAddFlashcard: (flashcard: { frontImage: string; backText: string; pronunciation: string }) => void }> = ({ onAddFlashcard }) => {
    const [frontImage, setFrontImage] = useState('');
    const [backText, setBackText] = useState('');
    const { language } = useLanguage();
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFrontImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        let image = frontImage;
        let pronunciation = '';

        // No more auto-fetch image for English word

        // Generate pronunciation using SpeechSynthesis API
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            pronunciation = backText;
        }

        onAddFlashcard({ frontImage: image, backText, pronunciation });
        setFrontImage('');
        setBackText('');
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{
            background: '#fffbe7',
            borderRadius: 20,
            padding: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            maxWidth: 340,
            margin: '0 auto',
            fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
        }}>
            <div>
                <label htmlFor="backText">
                    {language === 'en' ? 'Word:' : 'Từ vựng:'}
                </label>
                <input
                    type="text"
                    id="backText"
                    value={backText}
                    onChange={(e) => setBackText(e.target.value)}
                    required
                    style={{ margin: '8px 0', fontSize: 18, borderRadius: 8, padding: 6 }}
                />
            </div>
            {!isEnglish(backText) && (
                <div>
                    <label htmlFor="frontImage">
                        {language === 'en' ? 'Front Image (Take a photo with device camera):' : 'Ảnh mặt trước (Chụp bằng camera):'}
                    </label>
                    <input
                        type="file"
                        id="frontImage"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageChange}
                        required={!isEnglish(backText)}
                        style={{ margin: '8px 0', fontSize: 16 }}
                    />
                    <small>
                        {language === 'en'
                            ? '(On supported devices, this will open the camera. Otherwise, select an image.)'
                            : '(Trên thiết bị hỗ trợ, sẽ mở camera. Nếu không, chọn ảnh từ thư viện.)'}
                    </small>
                    {frontImage && (
                        <div>
                            <img src={frontImage} alt="Preview" style={{ maxWidth: 150, marginTop: 8, borderRadius: 12 }} />
                        </div>
                    )}
                </div>
            )}
            <button type="submit" style={{
                background: '#ffb347',
                color: '#fff',
                border: 'none',
                borderRadius: 16,
                padding: '10px 24px',
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 12,
                cursor: 'pointer',
            }} disabled={loading}>
                {loading
                    ? (language === 'en' ? 'Adding...' : 'Đang thêm...')
                    : (language === 'en' ? 'Add Flashcard' : 'Thêm thẻ')}
            </button>
        </form>
    );
};

export default FlashcardForm;