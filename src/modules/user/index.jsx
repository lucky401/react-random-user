import { Routes, Route } from 'react-router-dom';

import Layout from '../../layouts/general.layout';

import ListView from './views/list';

function Modules() {
  return (
    <Layout>
      <Routes>
        <Route path="user-list" element={<ListView />} />
      </Routes>
    </Layout>
  );
}

export default Modules;
