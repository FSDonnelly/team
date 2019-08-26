import React from 'react';

import AdminLayout from '../../HOC/AdminLayout';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className='user_dashboard'>
        <div className=''>This is your Dashboard</div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
