import Layout from "@/components/layout/Layout";
import PhotoManager from "@/components/admin/PhotoManager";

const AdminDashboardPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Fotografias</h1>
        </div>
        <PhotoManager />
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;