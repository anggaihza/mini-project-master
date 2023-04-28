import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function ProductDetail() {
  const [product, setProduct] = useState([]);
  const {id} = useParams();
  console.log(product);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/product/product-detail/${id}`
        );
        setProduct(response.data.data[0]);
        console.log(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="flex flex-col items-center mt-20 justify-items-center">
      <div className="card mb-3" style={{maxWidth: "540px"}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={product.image}
              className="img-fluid rounded-start"
              alt="...."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.product_name}</h5>
              <p className="card-text">{product.category}</p>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Rp. {product.price}</p>
              <p className="card-text">Stock: {product.stock}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  {product.merchant}
                </small>
              </p>
            </div>
          </div>
        </div>
        <a
          onClick={() => navigate("/product-edit/" + product.id)}
          className="btn btn-primary">
          Edit
        </a>
      </div>
    </div>
  );
}

export default ProductDetail;
