import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Admin/Event";

const AdminEventPage = () => {
    return (
        <DashboardLayout title="Event" description="List of all Events" type="admin">
            <Event />
        </DashboardLayout>
    )
}

export default AdminEventPage;