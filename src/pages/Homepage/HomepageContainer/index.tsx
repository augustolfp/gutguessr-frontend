import Background from "./Background";
import Sun from "./Sun";

import "./homepageContainer.css";

interface Props {
  children?: React.ReactNode;
}

export default function HomepageContainer({ children }: Props) {
  return (
    <div id="homepage-container" className="w-full h-screen relative">
      <Sun />
      <Background />
      <div>{children}</div>
    </div>
  );
}
