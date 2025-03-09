import CardEvent from "@/components/ui/CardEvent";
import { IEvent } from "@/types/Event";
import Link from "next/link";

interface PropTypes {
    title: string;
    events: IEvent[];
    isLoading: boolean;
}

const HomeList = (props: PropTypes) => {
    const { title, events, isLoading } = props;

    return (
        <section className="mb-16">
            <div className="mb-2 flex items-center justify-between px-6 lg:px-0">
                <h2 className="text-2xl font-bold text-danger">{title}</h2>
                <Link href="/event" className="font-semibold text-foreground-500">
                    See More
                </Link>
            </div>
            <div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto py-2 pb-8 lg:grid-cols-4 lg:px-1">
                {!isLoading ? events?.map((event) => (
                    <CardEvent event={event} key={`card-event-${event._id}`} className="first:ml-6 last:mr-6 lg:first:ml-0 lg:last:mr-0"/>
                )) : (
                    Array.from({length: 4}).map((_, index) => (
                      <CardEvent 
                        key={`card-event-loading-${index}`} 
                        isLoading={isLoading}
                        className="first:ml-6 last:mr-6 lg:first:ml-0 lg:last:mr-0"
                      />
                    ))
                )}
            </div>
        </section>
    )
}

export default HomeList;