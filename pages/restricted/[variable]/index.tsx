import { NextPage } from 'next';

import withAuth from 'src/hoc/withAuth';
import RestrictedScreen from 'src/screens/RestrictedScreen/RestrictedScreen';

const RestrictedPage: NextPage = () => {
  return <RestrictedScreen />;
};

export default withAuth(RestrictedPage);
