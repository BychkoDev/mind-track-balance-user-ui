"use client";

import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { SendMetrics } from "@/app/[locale]/(protected)/dashboard/dashboardService";

export type Metrics = {
  mood: number;
  stressLevel: number;
  energy: number;
  anxiety: number;
  focus: number;
  recoveryFeeling: number;
  contexts?: string[];
  description?: string;
  tags: string[];
};

const metricKeys = ["mood", "stressLevel", "energy", "anxiety", "focus", "recoveryFeeling"] as const;
const contextKeys = ["WORK", "STUDY", "FATIGUE", "REST", "SOCIAL", "EXERCISE"] as const;

interface EmotionLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmotionLogModal({ isOpen, onClose }: EmotionLogModalProps) {
  const t = useTranslations("EmotionModal");
  const [metricValues, setMetricValues] = useState<Record<string, number>>({});
  const [selectedContexts, setSelectedContexts] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showLowValueWarning, setShowLowValueWarning] = useState(false);
  const [attemptedSave, setAttemptedSave] = useState(false);

  const setMetricValue = (metricId: string, value: number) => {
    setMetricValues((prev) => ({ ...prev, [metricId]: value }));
  };

  const toggleContext = (context: string) => {
    setSelectedContexts((prev) =>
      prev.includes(context) ? prev.filter((c) => c !== context) : [...prev, context]
    );
  };

  const handleSave = async (forceSave = false) => {
    setAttemptedSave(true);
    
    const allMetricsFilled = metricKeys.every(key => metricValues[key] !== undefined);
    
    if (!allMetricsFilled) {
      toast.error(t("confirmTitle"), { description: "Please provide all 6 metrics highlighted in red." });
      return;
    }

    const lowValuesCount = metricKeys.filter(key => metricValues[key] === 1).length;
    if (lowValuesCount >= 4 && !forceSave && !showLowValueWarning) {
      setShowLowValueWarning(true);
      return;
    }

    setIsSaving(true);
    // ... rest of saving logic
  
    const response = await SendMetrics({
      mood: metricValues.mood,
            stressLevel: metricValues.stressLevel,
            energy: metricValues.energy,
            anxiety: metricValues.anxiety,
            focus: metricValues.focus,
            recoveryFeeling: metricValues.recoveryFeeling,
            contexts:
              selectedContexts.length > 0 ? selectedContexts : undefined,
            description: description || undefined,
    } as Metrics);

    if(response.err === null) {
      setMetricValues({});
      setSelectedContexts([]);
      setDescription("");
      setShowLowValueWarning(false);
      setAttemptedSave(false);
      onClose();
      toast.success("Entry saved successfully! ✨");
      setIsSaving(false);
      return;
    }
    console.error("Save error:", response.err);
    toast.error("Failed to save. Please try again.");
    setIsSaving(false);
  };
  

  const hasAnyMetric = Object.keys(metricValues).length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl bg-white/50 backdrop-blur-xl border border-white/30 shadow-2xl p-8 pointer-events-auto relative max-h-[95vh] overflow-y-auto"
              style={{
                background: "linear-gradient(135deg, rgba(243, 232, 255, 0.6) 0%, rgba(209, 250, 229, 0.6) 100%)",
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/60 backdrop-blur-sm hover:bg-white transition-colors flex items-center justify-center shadow-sm"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{t("title")}</h2>
                <p className="text-gray-600 text-sm">{t("subtitle")}</p>
              </div>

              {/* Metrics Grid */}
              <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                  {metricKeys.map((metricId) => (
                    <MetricControl
                      key={metricId}
                      metricId={metricId}
                      label={t(`metrics.${metricId}`)}
                      value={metricValues[metricId]}
                      onChange={(value) => setMetricValue(metricId, value)}
                      isInvalid={attemptedSave && metricValues[metricId] === undefined}
                    />
                  ))}
                </div>
              </div>
              
              {/* rest of components... */}
              <AnimatePresence>
                {showLowValueWarning && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex gap-3 overflow-hidden"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-amber-900 mb-1">{t("confirmTitle")}</p>
                      <p className="text-xs text-amber-800 mb-3">{t("confirmLowValues")}</p>
                      <button
                        onClick={() => handleSave(true)}
                        className="text-xs font-bold text-amber-900 underline"
                      >
                        {t("confirmAction")}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Context Tags */}
              <div className="mb-5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block px-1">
                  {t("contextLabel")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {contextKeys.map((context) => (
                    <motion.button
                      key={context}
                      onClick={() => toggleContext(context)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedContexts.includes(context)
                          ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                          : "bg-white/60 text-gray-700 hover:bg-white/80"
                      }`}
                    >
                      {t(`contexts.${context}`)}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Reflection */}
              <div className="mb-6">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block px-1">
                  {t("reflectionLabel")}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 140))}
                  placeholder={t("placeholder")}
                  maxLength={140}
                  rows={3}
                  className="w-full rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 px-4 py-3 text-gray-700 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition-all shadow-sm"
                  style={{ boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.02)" }}
                />
                <div className="text-[10px] font-bold text-gray-400 mt-2 text-right px-1">
                  {description.length}/140
                </div>
              </div>

              {/* Save Button */}
              <motion.button
                onClick={() => handleSave()}
                disabled={isSaving}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-4 rounded-2xl text-white font-bold transition-all shadow-xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 shadow-purple-500/25 hover:shadow-purple-500/40`}
              >
                {isSaving ? "..." : t("save")}
              </motion.button>

              <p className="text-[10px] font-bold text-gray-400 text-center mt-4 tracking-widest uppercase italic">
                🔒 {t("privacy")}
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function MetricControl({
  metricId,
  label,
  value,
  onChange,
  isInvalid,
}: {
  metricId: string;
  label: string;
  value?: number;
  onChange: (value: number) => void;
  isInvalid?: boolean;
}) {
  const t = useTranslations("EmotionModal.labels");
  const levels = [1, 2, 3, 4, 5];

  const getMinLabel = () => {
    switch(metricId) {
      case 'mood': return t('low');
      case 'stressLevel': return t('calm');
      case 'energy': return t('drained');
      case 'anxiety': return t('none');
      case 'focus': return t('scattered');
      case 'recoveryFeeling': return t('poor');
      default: return "";
    }
  };

  const getMaxLabel = () => {
    switch(metricId) {
      case 'mood': return t('high');
      case 'stressLevel': return t('high');
      case 'energy': return t('energized');
      case 'anxiety': return t('high');
      case 'focus': return t('sharp');
      case 'recoveryFeeling': return t('great');
      default: return "";
    }
  };

  return (
    <div className={`space-y-3 p-2 rounded-2xl transition-all ${isInvalid ? 'bg-red-500/5 ring-1 ring-red-500/20' : ''}`}>
      <div className="flex justify-between items-center px-1">
        <label className={`text-xs font-bold transition-colors ${isInvalid ? 'text-red-600' : 'text-gray-700'}`}>
          {label}
        </label>
        {isInvalid && (
           <motion.span 
             initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
             className="text-[10px] font-bold text-red-500 uppercase italic"
           >
             Required
           </motion.span>
        )}
      </div>

      <div className="relative pt-1 pb-5 h-6 flex items-center justify-between px-2">
         {levels.map((level) => (
            <motion.button
              key={level}
              onClick={() => onChange(level)}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.85 }}
              className={`w-7 h-7 rounded-full transition-all flex items-center justify-center relative z-10 ${
                value === level
                  ? "bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/40 ring-2 ring-white/50"
                  : value && value >= level
                  ? "bg-gradient-to-br from-purple-400/50 to-cyan-400/50"
                  : "bg-white/80 hover:bg-white border border-white/50 shadow-sm"
              }`}
            >
              {value === level && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 rounded-full bg-white shadow-sm"
                />
              )}
            </motion.button>
          ))}
          
          {/* Labels underneath */}
          <div className="absolute top-8 left-0 right-0 flex justify-between px-1 pointer-events-none">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-20 text-left leading-none">
              {getMinLabel()}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-20 text-right leading-none">
              {getMaxLabel()}
            </span>
          </div>
      </div>
    </div>
  );
}
