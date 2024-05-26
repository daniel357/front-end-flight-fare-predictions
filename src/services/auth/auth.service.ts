import auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { BASE_DOMAIN, COGNITO_CONFIG, ROUTES } from '../../globals/constants';
import { UserDetails } from './auth.types';
import { ISignUpResult } from 'amazon-cognito-identity-js';

const transformEmail = (email: string) => email.toLowerCase();

class AuthService {
  constructor() {
    auth.configure({
      region: COGNITO_CONFIG.REGION,
      userPoolId: COGNITO_CONFIG.USER_POOL_ID,
      userPoolWebClientId: COGNITO_CONFIG.USER_POOL_APP_ID,
      identityPoolId: COGNITO_CONFIG.IDENTITY_POOL_ID,
      oauth: {
        domain: COGNITO_CONFIG.DOMAIN,
        scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: `${BASE_DOMAIN}${ROUTES.RESTRICTED}`,
        redirectSignOut: `${BASE_DOMAIN}${ROUTES.LOGIN}`,
        responseType: 'code',
      },
      ssr: true,
    });
  }

  federateSignIn(socialNetwork: CognitoHostedUIIdentityProvider): void {
    auth.federatedSignIn({ provider: socialNetwork });
  }

  async login(email: string, password: string): Promise<UserDetails | void> {
    try {
      return await auth.signIn(email, password);
    } catch (err) {
      return;
    }
  }

  async logout(): Promise<void> {
    await auth.signOut()
  }

  async getCurrentAuthenticatedUser(): Promise<UserDetails | null> {
    try {
      const { signInUserSession: user } = await auth.currentAuthenticatedUser({ bypassCache: true });
      return user;
    } catch (error) {
      return null;
    }
  };


  async resetPassword(email: string, resetCode: string, newPassword: string): Promise<void> {
    await auth.forgotPasswordSubmit(transformEmail(email), resetCode, newPassword)
  }

  async confirmUpdatedEmail(verificationCode: string): Promise<void> {
    await auth.verifyCurrentUserAttributeSubmit('email', verificationCode);
  }

  async updateEmail(email: string): Promise<string | null> {
    const user = await auth.currentAuthenticatedUser({ bypassCache: true });
    try {
      return await auth.updateUserAttributes(user, { email });
    } catch (error) {
      return null
    }
  };

  async forgotPassword(username: string): Promise<void> {
    await auth.forgotPassword(username)
  };

  async resendSignup(email: string): Promise<any>{
    try {
      await auth.resendSignUp(transformEmail(email));
      return true;
    } catch (error: any) {
      return false;
    }
  };

  async signup(email: string, password: string): Promise<ISignUpResult | null> {
    try {
      return await auth.signUp({ username: transformEmail(email), password });
    } catch (error: any) {
      if (error.code === 'UsernameExistsException') {
        if (!(await this.resendSignup(email))) {
          return null;
        }
        return null;
      }
      return null;
    }
  };

  async confirmUser(email: string, verificationCode: string): Promise<void>{
    await auth.confirmSignUp(transformEmail(email), verificationCode)
  };
}

export default new AuthService();
