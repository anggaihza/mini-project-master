import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ReactPaginate from "react-paginate";

function ShowProduct() {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [perPage, setPerPage] = useState(9);
  const [pageNumber, setPageNumber] = useState(0);

  const [sort, setSort] = useState(0);
  const [category, setCategory] = useState(0);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let url;

        switch (parseInt(sort)) {
          // Mengurutkan dari A - Z
          case 1:
            url = `http://localhost:2000/product/show?order=name&sort=ASC&category=${category}&name=${name}&page=${pageNumber}&limit=${perPage}`;
            break;
          // Mengurutkan dari Z - A
          case 2:
            url = `http://localhost:2000/product/show?order=name&sort=DESC&category=${category}&name=${name}&page=${pageNumber}&limit=${perPage}`;
            break;
          // Mengurutkan dari Termurah - Termahal
          case 3:
            url = `http://localhost:2000/product/show?order=price&sort=ASC&category=${category}&name=${name}&page=${pageNumber}&limit=${perPage}`;
            break;
          // Mengurutkan dari Termahal - Termurah
          case 3:
            url = `http://localhost:2000/product/show?order=price&sort=DESC&category=${category}&name=${name}&page=${pageNumber}&limit=${perPage}`;
            break;

          default:
            url = `http://localhost:2000/product/show?order=createdAt&sort=ASC&category=${category}&name=${name}&page=${pageNumber}&limit=${perPage}`;
        }
        const productData = await axios.get(url);
        setProducts(productData.data.data);
        setTotalPage(productData.data.totalPage);

        console.log(productData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [sort, category, name, pageNumber, perPage]);

  console.log(name);

  const handlePageClick = ({selected}) => {
    setPageNumber(selected + 1);
    console.log(selected);
  };

  return (
    <>
      <div>
        <h1 className="m-auto text-center text-gray-600 my-4">
          Available Product
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="my-2">
          <input
            type="text"
            name="name"
            placeholder="Search Product Name"
            className="border border-gray-400 py-2 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-72 text-center"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <select
            className="border mx-2 text-gray-600 border-gray-400 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-72 text-center"
            placeholder="Sort by"
            onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="1">Sort by product name A - Z </option>
            <option value="2">Sort by product name Z - A </option>
            <option value="3">Sort by price Lowest - Highest </option>
            <option value="4">Sort by price Highest - Lowest </option>
          </select>

          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border mx-2 text-gray-600 border-gray-400 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-72 text-center">
            <option value="">Select Category</option>
            <option value="1">Automotive</option>
            <option value="2">Entertainment</option>
            <option value="3">Fashion</option>
            <option value="4">Food</option>
            <option value="5">Health</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 justify-items-center items-center text-center p-4">
        {products.map((product) => {
          return (
            <div className="">
              <div className="card" style={{height: "480px"}}>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{width: "400px", height: "250px", objectFit: "cover"}}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h5 className="card-title">{product.price}</h5>
                  <p className="card-text">{product.description}</p>
                  <div>
                    <a
                      onClick={() => navigate("/product-detail/" + product.id)}
                      className="btn btn-primary"
                      style={{
                        display: "block",
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        right: "0",
                      }}>
                      Detail
                    </a>
                  
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={totalPage}
        breakLabel={"..."}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
}

export default ShowProduct;
