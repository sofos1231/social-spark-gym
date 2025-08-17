import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { CheckCircle2, X } from "lucide-react";

interface PaywallSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PaywallSheet({ open, onOpenChange }: PaywallSheetProps) {
  const features = [
    "Unlimited AI coaching sessions",
    "Personalized feedback & insights", 
    "Advanced practice scenarios"
  ];

  const plans = [
    {
      id: "yearly",
      name: "Yearly",
      price: "$4.99/mo",
      originalPrice: "$9.99/mo",
      discount: "51% off",
      recommended: true
    },
    {
      id: "monthly", 
      name: "Monthly",
      price: "$9.99/mo",
      originalPrice: null,
      discount: null,
      recommended: false
    }
  ];

  const [selectedPlan, setSelectedPlan] = React.useState("yearly");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[80vh] bg-transparent border-none p-0"
      >
        {/* Background with exact reference gradient */}
        <div 
          className="h-full rounded-t-[22px] relative overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 45% 20%, rgba(255,130,180,0.18) 0%, rgba(0,0,0,0) 55%),
              linear-gradient(180deg, #9A1B8F 0%, #5B2E8C 40%, #102346 100%)
            `
          }}
        >
          {/* Glass container */}
          <div className="h-full bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-t-[22px] p-6 shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
            
            {/* Header */}
            <SheetHeader className="text-center space-y-4 mb-8">
              <SheetTitle className="text-[22px] font-semibold text-white leading-[120%]">
                Unlock your AI coach
              </SheetTitle>
              <SheetDescription className="text-white/60 text-base">
                Get personalized training and faster progress
              </SheetDescription>
            </SheetHeader>

            {/* Features in glass card */}
            <div className="bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px] p-6 mb-8">
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#9BE8DA] flex-shrink-0" />
                    <span className="text-white text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan selector */}
            <div className="space-y-3 mb-8">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full p-4 rounded-[22px] border transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'border-white/30 bg-white/[0.08] shadow-[0_0_40px_rgba(155,232,218,0.4)]'
                      : 'border-white/[0.16] bg-white/[0.06] backdrop-blur-[24px] hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                        selectedPlan === plan.id 
                          ? 'border-[#9BE8DA] bg-[#9BE8DA]' 
                          : 'border-white/40'
                      }`}>
                        {selectedPlan === plan.id && (
                          <CheckCircle2 className="w-full h-full text-[#0B1B2F]" />
                        )}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{plan.name}</span>
                          {plan.recommended && (
                            <span className="px-2 py-1 bg-gradient-to-r from-[#9BE8DA] to-[#59C9B8] text-[#0B1B2F] text-xs font-bold rounded-full">
                              Recommended
                            </span>
                          )}
                        </div>
                        {plan.discount && (
                          <span className="text-[#9BE8DA] text-sm font-medium">{plan.discount}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{plan.price}</div>
                      {plan.originalPrice && (
                        <div className="text-white/60 text-sm line-through">{plan.originalPrice}</div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="space-y-4">
              {/* Primary CTA (mint pill) */}
              <Button 
                className="w-full h-[56px] bg-gradient-to-r from-[#9BE8DA] to-[#59C9B8] text-[#0B1B2F] font-medium border border-white/10 hover:scale-[0.96] active:scale-[0.96] shadow-[0_4px_12px_rgba(155,232,218,0.3)] rounded-xl"
              >
                Continue
              </Button>
              
              {/* Secondary actions */}
              <div className="flex flex-col items-center space-y-3">
                <button className="text-white/60 text-sm font-medium hover:text-white transition-colors">
                  Restore purchases
                </button>
                <p className="text-white/40 text-xs text-center">
                  Cancel anytime. No commitment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}