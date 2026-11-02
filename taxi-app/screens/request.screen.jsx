import { useNavigation } from '@react-navigation/native';
import RequestForm from '../components/requestForm/requestForm.jsx';

const RequestScreen = () => {
  const nav = useNavigation();

  const handleSubmit = (data) => {
    nav.navigate('driving', { data })
  }

  return <RequestForm onSubmit={handleSubmit} />;
}

export default RequestScreen;