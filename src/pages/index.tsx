// pages/index.tsx
import Layout from '../component/Layout';
import { NextPageWithLayout } from '../types/pages';
import Homes from './Home';

const Home: NextPageWithLayout = () => {
  return <Homes />;
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;