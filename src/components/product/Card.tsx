import StarIcon from "../icon/StarIcon";
import "./_style/product-component.scss";
export default function Card() {
    return (
        <div className="card">
            <img
                src="https://images.unsplash.com/photo-1724198169550-ba2fde71cfc7?q=80&w=1982&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="card-image"
            />
            <div className="card-info">
                <h4 className="card-title">Sách truy hồn</h4>
                <div className="card-rating">
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon>
                </div>

                <div className="card-price">
                    <span className="card-old-price">5000</span>
                    <span className="card-new-price">4500</span>
                </div>
                <button className="card-button">Mua ngay</button>
            </div>
        </div>
    );
}
