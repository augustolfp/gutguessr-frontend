import Image2 from "./silhouettes/silhueta2.svg";

export default function Background() {
  return (
    <div className="">
      <img
        id="image2"
        src={Image2}
        className="absolute bottom-1/2 left-0 w-full"
      />
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#4a044e]"></div>
    </div>
  );
}
