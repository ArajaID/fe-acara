import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Pagination, Select, SelectItem } from "@heroui/react";

interface PropTypes {
    totalPages: number,
}

const EventFooter = (props: PropTypes) => {
    const { totalPages } = props;
    const { currentLimit, currentPage, handleChangePage, handleChangeLimit } = useChangeUrl();

    return (
        <div className="flex items-center justify-center flex-col gap-4 lg:flex-row lg:justify-between">
            <Select 
                className="max-w-28" 
                size="md" 
                selectedKeys={[`${currentLimit}`]}
                selectionMode="single"
                onChange={handleChangeLimit}
                startContent={<p className="text-small">Show:</p>}
                disallowEmptySelection
                >
                    {LIMIT_LISTS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            { item.label }
                        </SelectItem>
                    ))}
            </Select>          
           
            { totalPages > 1 && (
                    <Pagination 
                        isCompact 
                        showControls 
                        color="danger" 
                        page={Number(currentPage)} 
                        total={totalPages}
                        onChange={handleChangePage}
                        loop
                    />
            )}
        </div>
    )
}

export default EventFooter;