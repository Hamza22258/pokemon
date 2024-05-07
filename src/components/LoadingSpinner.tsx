import { Container, Spinner } from 'react-bootstrap';

export const LoadingSpinner: React.FC = () => (
  <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
    <Spinner data-testid='spinner' animation='border' variant='primary' />
  </Container>
);
