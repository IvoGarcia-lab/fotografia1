import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import Layout from '@/components/layout/Layout';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <Skeleton className="h-8 w-1/4 mb-4" />
          <Skeleton className="h-96 w-full" />
        </div>
      </Layout>
    );
  }

  return session ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;