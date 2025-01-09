export default function HomepageHero() {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-extrabold md:text-4xl lg:text-5xl">
        <span className="text-primary">Gut</span>Guessr
      </h1>
      <p className="text-4xl font-black mt-12 md:text-5xl lg:text-7xl">
        Explore o Mundo
      </p>
      <span>
        <div className="relative text-4xl font-black tracking-wider md:text-5xl lg:text-7xl">
          <span className="bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent blur-3xl opacity-50 absolute">
            em um novo nível
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-accent">
            em um novo nível
          </span>
        </div>
      </span>
      <p className="text-center text-base font-light text-base-content text-opacity-70 mt-4 md:text-lg lg:text-2xl lg:leading-8">
        No GutGuessr você será transportado para <br /> qualquer lugar do
        planeta: <br /> desde Paris na França, até Barro Duro no Piauí.
      </p>
      <p className="text-base font-light text-base-content text-opacity-70 mt-4 md:text-lg lg:text-2xl">
        Tudo isso de graça e sem sair de casa!
      </p>
    </div>
  );
}
