import PracticeHubSwiper from '@/components/PracticeHubSwiper';
import TopStatusBar from '@/components/TopStatusBar';

const PracticeHub = () => {

  return (
    <>
      <TopStatusBar />
      <div 
        className="min-h-screen pt-16 pb-20"
        style={{ background: 'var(--gradient-background)' }}
      >
        {/* Header */}
        <div className="section-container pt-6">
          <div className="text-center mb-6">
            <h1 className="heading-hero mb-2">
              Practice Hub
            </h1>
            <p className="text-base text-muted-foreground font-medium">
              Choose your training world
            </p>
          </div>
        </div>

        {/* Horizontal Practice Hub */}
        <div className="flex-1">
          <PracticeHubSwiper />
        </div>
      </div>
    </>
  );
};

export default PracticeHub;