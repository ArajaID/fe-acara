import DataTable from "@/components/ui/DataTable/DataTable";
import { Chip, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_EVENT } from "./Event.constants";
import useEvent from "./useEvent";
import AddEventModal from "./AddEventModal";
//import DeleteEventModal from "./DeleteEventModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Event = () => {
    const { push, isReady, query } = useRouter();
    const { 
        dataEvents, 
        isLoadingEvents, 
        isRefetchingEvents,
        refetchEvents,
        
        selectedId, 
        setSelectedId,
    } = useEvent();

    const addEventModal = useDisclosure();
    const deleteEventModal = useDisclosure();
    const { setUrl } = useChangeUrl();

    useEffect(() => {
        if(isReady) {
          setUrl()
        }
    }, [isReady])
 
    const renderCell = useCallback(
        (event: Record<string, unknown>, columnKey: Key) => {
            const cellValue = event[columnKey as keyof typeof event];

            switch(columnKey) {
                case "banner":
                    return (
                        <Image className="w-36 aspect-video object-cover rounded-lg" src={`${cellValue}`} alt="icon" width={200} height={100} />
                    );
                case "isPublish":
                    return (
                        <Chip 
                            color={cellValue ? "success" : "warning"} 
                            size="sm" 
                            variant="flat">
                                {cellValue === true ? "Published" : "Not Published"}
                        </Chip>
                    );
                case "actions":
                    return (
                      <DropdownAction 
                        onPressButtonDetail={() => push(`/admin/event/${event._id}`)} 
                        onPressButtonDelete={() => {
                            setSelectedId(`${event._id}`);
                            deleteEventModal.onOpen();
                        }}
                      /> 
                    );
                default: 
                    return cellValue as ReactNode;
            }
        }, [push]
    );

    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable 
                    buttonTopContentLabel="Create Event"
                    columns={COLUMN_LISTS_EVENT} 
                    data={dataEvents?.data || []}
                    emptyContent="Event is empty"
                    isLoading={isLoadingEvents || isRefetchingEvents}
                    onClickButtonTopContent={addEventModal.onOpen}
                    renderCell={renderCell} 
                    totalPages={dataEvents?.pagination.totalPages}
                    />
            )}
            <AddEventModal 
                {...addEventModal} 
                refetchEvents={refetchEvents} 
            />
            {/* <DeleteEventModal 
                {...deleteEventModal}
                refetchEvent={refetchEvent} 
                selectedId={selectedId} 
                setSelectedId={setSelectedId}
            /> */}
        </section>
    )
}

export default Event;