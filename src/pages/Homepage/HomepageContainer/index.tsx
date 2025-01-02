import Background from "./Background";
import Sun from "./Sun";

interface Props {
  children?: React.ReactNode;
}

export default function HomepageContainer({ children }: Props) {
  return (
    <div className="w-full h-screen relative">
      <Sun />
      <Background />
      <div>{children}</div>
    </div>
  );
}
