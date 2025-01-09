import CreateSinglePlayerSession from "./CreateSinglePlayerSession";
import HomepageContainer from "./HomepageContainer";
import HomepageHero from "./HomepageHero";

export default function Homepage() {
  const handleOpenModal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const modal = document.getElementById(
      "createSinglePlayerSessionModal"
    ) as HTMLDialogElement;

    modal.showModal();
  };
  return (
    <HomepageContainer>
      <div className="container mx-auto pt-16 flex flex-col justify-center items-center relative">
        <HomepageHero />
        <button
          onClick={handleOpenModal}
          className="btn btn-primary mt-8 lg:btn-lg"
        >
          Jogar Agora!
        </button>
        <dialog id="createSinglePlayerSessionModal" className="modal">
          <div className="modal-box">
            <CreateSinglePlayerSession />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </HomepageContainer>
  );
}
