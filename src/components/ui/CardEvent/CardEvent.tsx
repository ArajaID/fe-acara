import { IEvent } from "@/types/Event";
import { cn } from "@/utils/cn";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

interface PropType {
    className?: string;
    event: IEvent;
    key?: string;
}

const CardEvent = (props: PropType) => {
    const { event, className, key } = props;
    return (
            <Card 
                shadow="sm" 
                isPressable
                as={Link}
                href={`/event/${event.slug}`}
                key={key} 
                className={cn(className, "cursor-pointer")}
            >
                <CardBody>
                    <Image 
                        alt="cover" 
                        src={`${event?.banner}`}
                        width={1920}
                        height={1080} 
                        className="aspect-video w-full rounded-lg object-cover" 
                    />
                </CardBody>
            </Card>
    )
}

export default CardEvent;