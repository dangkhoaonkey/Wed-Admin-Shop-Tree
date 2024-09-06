import '../App.css'
import { useEffect, useState } from 'react';
import NavBar from '../component/NavBar';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Navigate } from 'react-router-dom';
import InsertProducts from './AddProducts';
import Swal from 'sweetalert2'



function Products() {
  const [show, setShow] = useState(false);
  const [Products, setProducts] = useState([]);
  const [ProductId, setProductId] = useState(null);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:6969/products/');
      console.log(response);
      const result = await response.json();
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    Swal.fire({
      title: "Xác nhận xoá sản phẩm",
      text: "Bạn sẽ không thể khôi phục lại được!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, chắc chắn!"
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const response = await fetch(`http://localhost:6969/products/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          if (data.status) {
            fetchProducts();
            Swal.fire(
              "Đã xoá!",
              "Item này đã được xoá.",
              "success"
            );
          } else {
            Swal.fire(
              "Thất bại!",
              "Đã có lỗi xảy ra.",
              "error"
            );
          }
        }
      } catch (error) {
        console.log(error);
        Swal.fire(
          "Failed!",
          "Your file has not been deleted.",
          "error"
        );
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <script src="sweetalert2.min.js"></script>
      <link rel="stylesheet" href="sweetalert2.min.css"></link>
      <NavBar />
      <Container className="mt-5 p-5">
        <h1 variant="success">Sản phẩm</h1>

        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <Breadcrumb>
              <Breadcrumb.Item href="">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="">
                Sản phẩm
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Tất cả sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="p-2 ms-auto">
            <Dropdown as={ButtonGroup}>
              <Button className='bg-dark' variant="dark">Sắp xếp</Button>

              <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />

              <Dropdown.Menu>
                <Dropdown.Item href="">Theo thời gian</Dropdown.Item>
                <Dropdown.Item href="">Theo tên sản phẩm</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="p-2">
            <Button variant="dark" href='/products/add'>+ Thêm sản phẩm</Button>
          </div>

        </Stack>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Thumbnail</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Số lượng</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    style={{ width: '100px', height: '100px' }}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category_id.name}</td>
                <td>{product.quantity}</td>
                <td>
                  <Dropdown as={ButtonGroup}>
                    <Button
                      variant="dark"
                      onClick={() => { toggleShow(); setProductId(product._id) }}
                    >
                      Xem chi tiết
                    </Button>

                    <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />

                    <Dropdown.Menu>
                      <Dropdown.Item href={`products/update/${product._id}`}>Sửa thông tin</Dropdown.Item>
                      <Dropdown.Item onClick={() => deleteProduct(`${product._id}`)}>Xoá sản phẩm</Dropdown.Item>
                    </Dropdown.Menu>

                    <Offcanvas
                      show={show && ProductId === product._id}
                      onHide={handleClose}
                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Chi tiết sản phẩm</Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          style={{ width: '100px', height: '100px' }}
                        />
                        <p>Tên sản phẩm: {product.name}</p>
                        <p>Giá tiền: {product.price}</p>
                        <p>Danh mục: {product.category_id.name}</p>
                        <p>Số lượng:{product.quantity}</p>
                        <p>Loại: {product.type}</p>
                        <p>Kích cỡ: {product.size}</p>
                        <p>Xuất xứ: {product.origin}</p>
                        <p>Mô tả: {product.description}</p>
                        <p>Ngày tạo: {product.createdAt}</p>
                        <p>Ngày cập nhật: {product.updatedAt}</p>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </Dropdown>
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>



        <Pagination className="mt-5 d-flex justify-content-center">
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </Container>
    </Container>
  );
}

export default Products;
