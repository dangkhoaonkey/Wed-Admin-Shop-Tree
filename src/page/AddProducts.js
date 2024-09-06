import { useState } from 'react';
import '../App.css'
import NavBar from '../component/NavBar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function AddProducts() {
  const [validated, setValidated] = useState(false);
  const [CategoryValue, setCategoryValue] = useState('66097a0d378d336f7f23e71a');
  const [Name, setName] = useState("");
  const [Image, setImage] = useState("");
  const [Thumbnail, setThumbnail] = useState("");
  const [Price, setPrice] = useState(0);
  const [Description, setDescription] = useState("");
  const [Quantity, setQuantity] = useState(0);
  const [Type, setType] = useState("");
  const [Size, setSize] = useState("");
  const [Origin, setOrigin] = useState("");

  const navigate = useNavigate();

  const categoryRadios = [
    { name: 'Cây Trồng', value: '66097a0d378d336f7f23e71a' },
    { name: 'Chậu cây trồng', value: '66097a35378d336f7f23e71c' },
    { name: 'Phụ kiện chăm sóc', value: '66097a5f378d336f7f23e71e' },
  ];

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      Swal.fire(
        'Thêm sản phẩm thất bại',
        'Thiếu thông tin sản phẩm',
        'error'
      )
      return;
    }
    event.preventDefault();
    try {
      Swal.fire({
        title: 'Xác nhận thêm sản phẩm',
        text: 'Bạn có chắc muốn thêm sản phẩm này không?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Thêm sản phẩm',
        cancelButtonText: 'Hủy'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const body = {
            name: Name,
            image: Image,
            thumbnail: Thumbnail,
            price: Price,
            description: Description,
            quantity: Quantity,
            type: Type,
            size: Size,
            origin: Origin,
            category_id: CategoryValue
          };
          const response = await fetch('http://localhost:6969/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })
          const data = await response.json();
          if (data.status) {
            Swal.fire(
              'Thêm sản phẩm thành công',
              'Chúc mừng bạn đã thêm sản phẩm mới',
              'success'
            ).then(() => {
              navigate('/products');
            })
    
          } else {
            Swal.fire(
              'Thêm sản phẩm thất bại',
              'Có lỗi xảy ra',
              'error'
            )
          }
        }
      })
    } catch (error) {
      console.log(error);
      alert('Thêm sản phẩm thất bại' + error.message)
    }


    setValidated(true);
  };
  return (
    <Container>
      <NavBar />
      <Container className="mt-5 p-5">
        <h1>Thêm sản phẩm</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Sản phẩm A"
                onChange={(e) => setName(e.target.value)}
              // defaultValue="Mark"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Ảnh sản phẩm</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập vào 1 liên kết ảnh"
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập vào 1 liên kết ảnh"
                onChange={(e) => setThumbnail(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Giá tiền</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="123456"
                onChange={(e) => setPrice(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Cây xịn quá"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="123"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Loại</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ưa bóng"
                onChange={(e) => setType(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Kích cỡ</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ưa bóng"
                onChange={(e) => setSize(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Xuất xứ</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Châu Phi"
                onChange={(e) => setOrigin(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Danh mục</Form.Label>
              <ButtonGroup>
                {categoryRadios.map((categoryRadio, idCate) => (
                  <ToggleButton
                    key={idCate}
                    id={`radio-${idCate}`}
                    type="radio"
                    variant={'outline-success'}
                    name="categoryRadio"
                    value={categoryRadio.value}
                    checked={CategoryValue === categoryRadio.value}
                    onChange={(item) => setCategoryValue(item.currentTarget.value)}
                  >
                    {categoryRadio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Form.Group>
          </Row>

          <Button variant="dark" type="submit">Thêm sản phẩm mới</Button>
        </Form>
      </Container>
    </Container>
  );
}

export default AddProducts;
