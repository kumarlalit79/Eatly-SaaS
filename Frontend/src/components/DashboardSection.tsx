import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Particles } from "@/components/ui/particles";
import dashboardImage from "@/assets/Eatly-dashboard.png";

const DashboardSection = () => {
  return (
    <section className="flex flex-col overflow-hidden bg-background relative py-0 md:py-0 mb-[-100px] mt-[-50px]">
      <Particles
        className="absolute inset-0 z-0 h-full w-full"
        quantity={150}
        ease={80}
        color="#0F766E"
        refresh
      />
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-foreground dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-primary">
                Food Intelligence
              </span>
            </h1>
          </>
        }
      >
        <img
          src={dashboardImage}
          alt="Eatly Dashboard"
          className="mx-auto rounded-2xl object-cover h-full object-left-top draggable-false"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
};

export default DashboardSection;
