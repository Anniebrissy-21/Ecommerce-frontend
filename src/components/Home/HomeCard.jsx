import styles from "./HomeCard.module.css";
import { Link } from "react-router-dom";

const HomeCard = ({ product }) => (
    <div className={styles.card}>
        <Link to={`/products/${product.slug}`} className={styles.link}>
            <div className={styles.imgWrap}>
                <img src={product.image} alt={product.name} className={styles.img} />
            </div>
            <div className={styles.body}>
                <h3 className={styles.title}>{product.name}</h3>
                <div className={styles.price}>${product.price}</div>
            </div>
        </Link>
    </div>
);

export default HomeCard;

