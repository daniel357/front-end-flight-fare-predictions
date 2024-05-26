import { useRouter } from 'next/router';

import Button from '../../components/Button/Button';
import styles from './HomeScreen.module.scss';
import { useDispatch } from 'react-redux';
import { logout } from '@redux/slices/auth';
import AuthService from 'src/services/auth/auth.service';

const HomeScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logOut = async () => {
    await AuthService.logout();
    dispatch(logout())
  }

  return (
    <div className={styles.container}>
      <Button onClick={() => router.push('/login')}>LOGIN</Button>
      <Button onClick={() => logOut()}>LOGOUT</Button>
    </div>
  );
};

export default HomeScreen;
