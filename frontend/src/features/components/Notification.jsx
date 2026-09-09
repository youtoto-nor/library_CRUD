import { useEffect, useState } from "react";
import "./Notification.css";

function Notification({ type = "success", message }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) {
            setVisible(false);
            return;
        }

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [message]);

    if (!visible || !message) {
        return null;
    }

    const isSuccess = type === "success";

    return (
        <div className={`notification ${type}`}>
            <div className="notification-content">
                <span className="notification-icon">
                    {isSuccess ? "✓" : "!"}
                </span>

                <div>
                    <strong>{message}</strong>
                    <p>
                        {isSuccess
                            ? "작업이 정상적으로 완료되었습니다."
                            : "다시 확인하고 시도해주세요."}
                    </p>
                </div>
            </div>

            <div className="notification-progress">
                <div className="notification-progress-bar"></div>
            </div>
        </div>
    );
}

export default Notification;