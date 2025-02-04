import PageHead from "@/components/commons/PageHead"
import { ReactNode } from "react";

interface PropTypes {
    children: ReactNode
    title?: string;
}

const AuthLayout = (props: PropTypes) => {

    const { children, title } = props;

    return (
        <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py">
            <PageHead title={title} />
            <section className="p-6 max-w-screen-3xl 3xl:container">
                {children}
            </section>
        </div>
    )
}

export default AuthLayout;