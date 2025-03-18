import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Admin/DetailTransaction";

const AdminDetailTransactionPage = () => {
    return (
        <DashboardLayout title="Detail Transaction" description="List Detail Transactions" type="admin">
            <DetailTransaction />
        </DashboardLayout>
    )
}

export default AdminDetailTransactionPage;