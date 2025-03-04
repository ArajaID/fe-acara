import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/currency";
import { Button, Card, CardBody, CardHeader, useDisclosure } from "@nextui-org/react";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LISTS_TICKET } from "./TicketTab.constant";
import useTicketTab from "./useTicketTab";

const TicketTab = () => {
    const {   
        dataTicket, 
        refetchTicket, 
        isPendingTicket,
        isRefetchingTicket,
    } = useTicketTab();

    const addTicketModal = useDisclosure();
    const deleteTicketModal = useDisclosure();
    const updateTicketModal = useDisclosure();

    const renderCell = useCallback(
        (ticket: Record<string, unknown>, columnKey: Key) => {
            const cellValue = ticket[columnKey as keyof typeof ticket];

            switch(columnKey) {
                case "price":
                    return (
                        `${convertIDR(cellValue as number)}`
                    );
                case "actions":
                    return (
                      <DropdownAction 
                        onPressButtonDetail={() => {
                            updateTicketModal.onOpen(); 
                        }} 
                        onPressButtonDelete={() => {
                           
                            deleteTicketModal.onOpen();
                        }}
                      /> 
                    );
                default: 
                    return cellValue as ReactNode;
            }
        }, []
    );

    return (
        <Card className="w-full p-4">
            <CardHeader className="items-center justify-between">
                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-bold w-full">Event Ticket</h1>
                    <p className="text-sm text-default-400 w-full">
                        Manage ticket of this event
                    </p>
                </div>
                <Button color="danger">
                    Add New Ticket
                </Button>
            </CardHeader>
            <CardBody className="pt-0">
                <DataTable 
                    columns={COLUMN_LISTS_TICKET} 
                    data={dataTicket || []}
                    emptyContent="Ticket is empty"
                    isLoading={isPendingTicket || isRefetchingTicket}
                    renderCell={renderCell}
                    totalPages={1}
                    showSearch={false}
                    showLimit={false}
                />
            </CardBody>
        </Card>
    );
}

export default TicketTab;