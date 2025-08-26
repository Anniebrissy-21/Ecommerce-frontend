import React from "react";

const Header = () => (
    <section
        style={{
            background: "#fffbea",
            borderRadius: 20,
            boxShadow: "0 4px 24px 0 rgba(180,160,130,0.09)",
            maxWidth: 900,
            margin: "40px auto",
            padding: "3rem 1.7rem 2.4rem 1.7rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
    >
        <div
            style={{
                width: 70,
                height: 70,
                background: "linear-gradient(135deg,#ecddc1,#f9e9c2 90%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
                boxShadow: "0 2px 12px 0 #eedeab60",
            }}
        >
            <span style={{ fontSize: 36, color: "#b89c67" }}>🛒</span>
        </div>
        <h1
            style={{
                fontWeight: 800,
                fontSize: "2.7rem",
                color: "#876b32",
                marginBottom: 8,
                letterSpacing: "1px",
            }}
        >
            Welcome to ShopIt!
        </h1>
        <div
            style={{
                width: 92,
                height: 5,
                borderRadius: 10,
                margin: "0 auto 16px auto",
                background: "linear-gradient(90deg,#f3e1af 40%,#bfa06b 100%)",
            }}
        />
        <p
            style={{
                color: "#a48960",
                fontSize: "1.17rem",
                marginBottom: 34,
                lineHeight: 1.45,
                maxWidth: 520,
                marginLeft: "auto",
                marginRight: "auto",
            }}
        >
            Where unique finds and trending products meet.<br />
            Start exploring and treat yourself today!
        </p>
        <a
            href="#shop"
            style={{
                background: "linear-gradient(90deg,#e1c48a,#dab47d)",
                color: "#78591d",
                fontWeight: 700,
                padding: "0.86rem 2.8rem",
                borderRadius: 22,
                fontSize: 18,
                textDecoration: "none",
                boxShadow: "0 2px 8px #e2c1835c",
                transition: "background .2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#ffeacc")}
            onMouseOut={(e) =>
            (e.target.style.background =
                "linear-gradient(90deg,#e1c48a,#dab47d)")
            }
        >
            Shop Now
        </a>
    </section>
);

export default Header;