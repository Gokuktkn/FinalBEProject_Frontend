import React, { useState } from 'react';
import '../css/CustomerFeedback.css';

// Giả lập dữ liệu ý kiến khách hàng
const feedbacks = [
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Great service!', read: false },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Very satisfied with the product.', read: true },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', message: 'Fast delivery and excellent support.', read: false },
];

const CustomerFeedback = () => {
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const handleViewDetail = (feedback) => {
        setSelectedFeedback(feedback);
        feedback.read = true; // Đánh dấu là đã đọc khi xem chi tiết
    };

    const handleBackToList = () => {
        setSelectedFeedback(null);
    };

    return (
        <div className="customer-feedback-container">
            <h2>Customer Feedback</h2>
            {selectedFeedback ? (
                <div className="feedback-detail-container">
                    <button onClick={handleBackToList}>Back to List</button>
                    <h3>Feedback Detail</h3>
                    <p><strong>Name:</strong> {selectedFeedback.name}</p>
                    <p><strong>Email:</strong> {selectedFeedback.email}</p>
                    <p><strong>Message:</strong> {selectedFeedback.message}</p>
                </div>
            ) : (
                <ul className="feedback-list">
                    {feedbacks.map(feedback => (
                        <li key={feedback.id} onClick={() => handleViewDetail(feedback)}>
                            <div className="feedback-info">
                                <div className="feedback-content">
                                    <p><strong>{feedback.name}</strong></p>
                                    <p>{feedback.email}</p>
                                    <p>{feedback.message.substring(0, 50)}...</p>
                                </div>
                                <div className="checkbox">
                                    <input type="checkbox" checked={feedback.read} readOnly />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomerFeedback;
