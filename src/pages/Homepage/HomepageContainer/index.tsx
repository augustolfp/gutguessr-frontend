import Background from "./Background";

interface Props {
  children?: React.ReactNode;
}

export default function HomepageContainer({ children }: Props) {
  return (
    <div className="w-full h-screen relative">
      <Background />
      <div>{children}</div>
    </div>
  );
}
