import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contetnt from '../components/Content';

const HomePage = () => {
  console.log('Home');

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Contetnt />
      <ToastContainer />
    </Container>
  );
};

export default HomePage;
