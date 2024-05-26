import styles from './RestrictedScreen.module.scss';
import useSWR from 'swr';
import { useHttp } from '../../hooks/useHttp';
import { getPosts } from '../../services/api/api-request-sample/sample.api';
import { SwrSample } from '../../services/api/api-request-sample/sample.swr';
import Button from '../../components/Button/Button';
import { useRouter } from 'next/router';
import { ROUTES } from '../../globals/constants';
import { replaceStringTemplateValuesFromObject } from '../../services/stringTemplate';

const RestrictedScreen = () => {
  const router = useRouter();
  const { http } = useHttp({ withLoading: true });
  const { variable } = router.query;

  const { data } = useSWR(SwrSample.getPosts(), () =>
    http(() => getPosts())
  );

  const redirect = (id: number) =>
    router.push(replaceStringTemplateValuesFromObject(ROUTES.RESTRICTED_WITH_VARIABLE, { id }))

  return (
    <ul className={styles.container}>
      {
        data && data.map(({ title, id }) => {
          return (
            <div>
              {variable && <h1>{variable}</h1>}
              <ul>
                <li key={id}>
                  <Button onClick={() => redirect(id)}>{title}</Button>
                </li>
              </ul>
            </div>
          )
        })
      }
    </ul>
  );
};

export default RestrictedScreen;
