import RioDeJaneiro from "./silhouettes/rio.svg";

export default function Background() {
  return (
    <div className="">
      <img
        id="rio-de-janeiro"
        src={RioDeJaneiro}
        className="absolute bottom-1/2 left-0 w-full"
      />
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#FFD200] opacity-25"></div>
    </div>
  );
}
