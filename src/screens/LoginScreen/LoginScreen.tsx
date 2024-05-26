import { FormData } from 'src/components/Form/Form.types';
import Form from 'src/components/Form/Form';
import SocialAuthButtons from 'src/components/SocialAuthButtons/SocialAuthButtons';

import { LOGIN_FORM_GROUP, REGISTRATION_INITIAL_VALUES } from './LoginScreen.constants';
import AuthService from 'src/services/auth/auth.service';
import { useRouter } from 'next/router';

const LoginScreen = () => {
  const router = useRouter();
  const onLogin = async (data: FormData) => {
    try{
      await AuthService.login(data.email, data.password)
      await router.push('/restricted')
    } catch(err) {
      return;
    }
  };

  return (
    <div>
      <Form
        initialValues={REGISTRATION_INITIAL_VALUES}
        groups={LOGIN_FORM_GROUP}
        buttonText='Login'
        onSubmit={onLogin}
      />
      <SocialAuthButtons />
    </div>
  );
};
export default LoginScreen;
