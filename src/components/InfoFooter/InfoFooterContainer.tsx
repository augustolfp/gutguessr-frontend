import { useDataContext } from "../../contexts/DataContext";

interface Props {
    children?: React.ReactNode;
}

export default function InfoFooterContainer({ children }: Props) {
    const { status } = useDataContext();

    let infoFooterStyle: string =
        status === "SUCCESS"
            ? "flex justify-center items-center h-3/6 transition-all"
            : "flex justify-center items-center h-1/6 transition-all";

    return <div className={`${infoFooterStyle}`}>{children}</div>;
}
