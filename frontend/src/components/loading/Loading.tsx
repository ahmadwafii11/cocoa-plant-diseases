interface LoadingProps {
    message?: string;
    fullScreen?: boolean;
}

export default function Loading({
    message = "Memuat...",
    fullScreen = true,
}: LoadingProps) {
    return (
        <>
            <div
                className={`loading-container ${fullScreen ? "loading-fullscreen": ""}`}
                role="status"
                aria-live="polite"
                aria-busy="true"
            >
                <div className="loading-spinner" aria-hidden="true" />
                <p className="loading-text">{message}</p>
            </div>
        </>
    );
}