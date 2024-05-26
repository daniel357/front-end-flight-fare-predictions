import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AuthService from 'src/services/auth/auth.service';
import { login } from '@redux/slices/auth';

const withAuth =
  <PageProps extends Record<string, unknown>>(
    Page: NextPage<PageProps>
  ): (({ ...props }: { [p: string]: any }) => JSX.Element | Promise<boolean>) =>
  ({ ...props }) => {
    const { isAuth, user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      if(!user) {
        AuthService.getCurrentAuthenticatedUser()
          .then(authenticatedUser => {
            if (!authenticatedUser) {
              router.push('/login');
            } else {
              dispatch(login(authenticatedUser))
            }
          })
      }
    }, [isAuth]);

    return isAuth ? <Page {...(props as PageProps)} /> : <></>;
  };

export default withAuth;
