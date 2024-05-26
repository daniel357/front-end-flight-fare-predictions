import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';

import StyledButton from '../Button/Button';

import styles from './SocialAuthButtons.module.scss';
import { SocialAuthEndpoint } from './SocialAuthButtons.types';
import AuthService from '../../services/auth/auth.service';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

const SocialAuthButtons = () => {
  const socialLogin = (social: SocialAuthEndpoint) => {
    AuthService.federateSignIn(CognitoHostedUIIdentityProvider[social])
  };

  return (
    <>
      <StyledButton onClick={() => socialLogin(SocialAuthEndpoint.Facebook)} className={styles.facebook}>
        <FacebookOutlinedIcon className={styles.socialIcon} />
        Connect with Facebook
      </StyledButton>
      <StyledButton onClick={() => socialLogin(SocialAuthEndpoint.Google)} className={styles.google}>
        <GoogleIcon className={styles.socialIcon} />
        Connect with   Google
      </StyledButton>
    </>
  );
};

export default SocialAuthButtons;
