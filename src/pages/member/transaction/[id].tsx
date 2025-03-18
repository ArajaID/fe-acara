import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Member/DetailTransaction";

const MemberDetailTransactionPage = () => {
    return (
        <DashboardLayout title="Detail Transaction" description="List Detail Transactions" type="member">
            <DetailTransaction />
        </DashboardLayout>
    )
}

export default MemberDetailTransactionPage;