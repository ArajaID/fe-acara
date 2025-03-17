import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Member/Transaction";

const MemberTransactionPage = () => {
    return (
        <DashboardLayout title="Transaction" description="List Transactions" type="member">
            <Transaction />
        </DashboardLayout>
    )
}

export default MemberTransactionPage;