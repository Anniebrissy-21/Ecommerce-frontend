import { Link } from "react-router-dom";

const ACCENT = "#b29561";
const HEAD = "#7b5e24";
const BG = "#f8efd9";

const NotFoundPage = () => {
    return (
        <section
            className="py-5 d-flex align-items-center"
            style={{
                background: BG,
                minHeight: "65vh",
                borderBottom: `2px solid ${ACCENT}`,
            }}
        >
            <div className="container py-5">
                <div
                    className="mx-auto text-center rounded-4 shadow"
                    style={{
                        maxWidth: 540,
                        background: "#fff8e3",
                        padding: "44px 32px 40px",
                        border: `1.5px solid ${ACCENT}`,
                    }}
                >
                    <h1
                        className="fw-bold mb-3"
                        style={{ color: HEAD, fontSize: "2.6rem" }}
                    >
                        Page Not Found!
                    </h1>
                    <p className="mb-4"
                        style={{
                            color: HEAD,
                            fontWeight: 500,
                            fontSize: '1.15rem'
                        }}
                    >
                        The page you tried accessing does not exist.
                    </p>
                    <Link to="/" tabIndex={0}>
                        <button
                            className="btn rounded-pill px-4 py-2"
                            style={{
                                backgroundColor: ACCENT,
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: "1.08rem",
                                border: "none",
                                boxShadow: "0 2px 8px 0 rgba(178,149,97,0.09)",
                                outline: "none",
                                textDecoration: "none"
                            }}
                        >
                            Back Home
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NotFoundPage;
