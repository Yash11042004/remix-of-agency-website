import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calculator } from 'lucide-react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: 'Email is required' })
  .email({ message: 'Enter a valid email address' })
  .max(255, { message: 'Email must be less than 255 characters' });


interface CalculatorFormProps {
  onBack: () => void;
  onClose: () => void;
}

type ProjectType = 'residential' | 'commercial' | 'hospitality' | '';
type ServiceLevel = 'consulting' | 'design' | 'full' | '';

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onBack, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '' as ProjectType,
    area: '',
    serviceLevel: '' as ServiceLevel,
    email: ''
  });
  const [estimate, setEstimate] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);


  const projectTypes = [
    { value: 'residential', label: 'Residential', description: 'Apartments, houses, private spaces' },
    { value: 'commercial', label: 'Commercial', description: 'Offices, retail, workspaces' },
    { value: 'hospitality', label: 'Hospitality', description: 'Hotels, restaurants, cafés' },
  ];

  const serviceLevels = [
    { value: 'consulting', label: 'Consulting', description: 'Design review & guidance', multiplier: 80 },
    { value: 'design', label: 'Design Only', description: 'Full design package', multiplier: 150 },
    { value: 'full', label: 'Full Service', description: 'Design + project management', multiplier: 250 },
  ];

  const calculateEstimate = () => {
    const area = parseFloat(formData.area) || 0;
    const serviceMultiplier = serviceLevels.find(s => s.value === formData.serviceLevel)?.multiplier || 0;
    const typeMultiplier = formData.projectType === 'hospitality' ? 1.3 : formData.projectType === 'commercial' ? 1.15 : 1;
    
    return Math.round(area * serviceMultiplier * typeMultiplier);
  };

  const handleNext = () => {
    if (step === 3) {
      setEstimate(calculateEstimate());
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    const parsedEmail = emailSchema.safeParse(formData.email);
    if (!parsedEmail.success) {
      setEmailError(parsedEmail.error.issues[0].message);
      return;
    }

    setEmailError(undefined);
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-estimate', {
        body: {
          email: parsedEmail.data,
          projectType: formData.projectType,
          area: parseFloat(formData.area),
          serviceLevel: formData.serviceLevel,
          estimate: estimate ?? calculateEstimate(),
        },
      });

      if (error || !data?.success) {
        throw error ?? new Error('Request failed');
      }

      toast({
        title: 'Estimate sent!',
        description: "We've received your request and will email the detailed breakdown.",
      });
      onClose();
    } catch (err) {
      console.error('Estimate submission failed', err);
      toast({
        title: "Couldn't send your estimate",
        description: 'Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const canProceed = () => {
    switch (step) {
      case 1: return formData.projectType !== '';
      case 2: return formData.area !== '' && parseFloat(formData.area) > 0;
      case 3: return formData.serviceLevel !== '';
      case 4: return formData.email.trim() !== '';
      default: return false;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-4"
    >
      <button
        onClick={step === 1 ? onBack : () => setStep(step - 1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        {step === 1 ? 'Back' : 'Previous'}
      </button>

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div 
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-foreground' : 'bg-foreground/20'}`}
          />
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Project type</h2>
          <p className="text-sm text-muted-foreground mb-4">What kind of space are we designing?</p>
          
          <div className="space-y-2">
            {projectTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFormData({ ...formData, projectType: type.value as ProjectType })}
                className={`w-full text-left p-3 rounded-md border transition-colors ${
                  formData.projectType === type.value 
                    ? 'border-foreground bg-foreground/5' 
                    : 'border-foreground/20 hover:border-foreground/40'
                }`}
              >
                <span className="text-sm font-medium text-foreground">{type.label}</span>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Project size</h2>
          <p className="text-sm text-muted-foreground mb-4">Approximate area in square meters</p>
          
          <div className="relative">
            <Input
              type="number"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              placeholder="e.g. 120"
              className="bg-foreground/5 border-foreground/20 text-foreground placeholder:text-muted-foreground focus:border-foreground/40 pr-12"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">m²</span>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Service level</h2>
          <p className="text-sm text-muted-foreground mb-4">How involved should we be?</p>
          
          <div className="space-y-2">
            {serviceLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => setFormData({ ...formData, serviceLevel: level.value as ServiceLevel })}
                className={`w-full text-left p-3 rounded-md border transition-colors ${
                  formData.serviceLevel === level.value 
                    ? 'border-foreground bg-foreground/5' 
                    : 'border-foreground/20 hover:border-foreground/40'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">{level.label}</span>
                  <span className="text-xs text-muted-foreground">~€{level.multiplier}/m²</span>
                </div>
                <p className="text-xs text-muted-foreground">{level.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Your estimate</h2>
          
          <div className="bg-foreground/5 border border-foreground/20 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Calculator className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Estimated project cost</span>
            </div>
            <div className="text-3xl font-semibold text-foreground">
              €{estimate?.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This is a rough estimate. Final pricing depends on materials, complexity, and timeline.
            </p>
          </div>

          <p className="text-sm text-muted-foreground mb-3">Get a detailed breakdown via email</p>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (emailError) setEmailError(undefined);
            }}
            placeholder="your@email.com"
            maxLength={255}
            aria-invalid={!!emailError}
            className="bg-foreground/5 border-foreground/20 text-foreground placeholder:text-muted-foreground focus:border-foreground/40"
          />
          {emailError && <p className="text-xs text-destructive mt-1">{emailError}</p>}

        </div>
      )}

      <button
        onClick={step === 4 ? handleSubmit : handleNext}
        disabled={!canProceed() || isSubmitting}
        className="w-full mt-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {step === 4 ? (isSubmitting ? 'Sending...' : 'Send estimate') : 'Continue'}
      </button>
    </motion.div>
  );
};

export default CalculatorForm;
