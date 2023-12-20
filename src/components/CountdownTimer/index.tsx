import { useState, useEffect } from "react";

interface Props {
    timestamp: number;
}

export default function CountDownTimer({ timestamp }: Props) {
    const startCountDown = Math.floor(
        (timestamp + 88 * 1000 - Date.now()) / 1000
    );
    const [countDown, setCountDown] = useState(startCountDown);

    useEffect(() => {
        const interval = setInterval(() => {
            const remainingTime =
                Math.floor((timestamp + 90 * 1000 - Date.now()) / 1000) >= 0
                    ? Math.floor((timestamp + 90 * 1000 - Date.now()) / 1000)
                    : 0;
            setCountDown(remainingTime);
        }, 1000);
        return () => clearInterval(interval);
    }, [timestamp]);

    return (
        <div className="absolute top-24 right-0 z-30 bg-base-100 text-base-content p-3 rounded-bl-xl rounded-tl-xl">
            <div className="flex flex-col items-center gap-0">
                <span className="font-semibold text-2xl">{countDown} s</span>
                <span className="font-light">remaining</span>
            </div>
        </div>
    );
}