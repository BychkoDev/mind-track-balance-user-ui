"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { env } from "@/env";

const emotions = [
  { id: "tired", icon: "😮‍💨", label: "Tired", color: "#f87171", score: 2 },
  { id: "focused", icon: "🎯", label: "Focused", color: "#fb923c", score: 4 },
  { id: "calm", icon: "😌", label: "Calm", color: "#facc15", score: 6 },
  { id: "relaxed", icon: "🧘", label: "Relaxed", color: "#a3e635", score: 8 },
  { id: "happy", icon: "😆", label: "Happy", color: "#22c55e", score: 10 },
];

const quickTags = ["Work", "Study", "Fatigue", "Rest", "Social", "Exercise"];

interface EmotionLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmotionLogModal({ isOpen, onClose }: EmotionLogModalProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reflection, setReflection] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = async () => {
    if (!selectedEmotion) return;

    const mood = emotions.find((e) => e.id === selectedEmotion);
    if (!mood) return;

    setIsSaving(true);

    try {
      const BACK_SERVER_URL = env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4090";
      
      // Get the current access token from cookies
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
      };
      
      const token = getCookie("jwt_access_token");

      const response = await fetch(`${BACK_SERVER_URL}/api/v1/mind-track/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          moodScore: mood.score,
          text: reflection || undefined,
          tags: selectedTags.length > 0 ? selectedTags : undefined,
        }),
      });

      if (!response.ok) throw new Error("Failed to save entry");

      toast.success("Mood captured successfully! ✨");
      
      // Reset and close
      setSelectedEmotion(null);
      setSelectedTags([]);
      setReflection("");
      onClose();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save your mood. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-[100]"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl p-8 pointer-events-auto relative"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(243, 232, 255, 0.7) 100%)",
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all flex items-center justify-center shadow-sm"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">My Day</h2>
                <p className="text-gray-500 text-sm">How are you feeling right now?</p>
              </div>

              {/* Emotion Grid */}
              <div className="mb-8">
                <div className="flex justify-between items-end gap-3">
                  {emotions.map((emotion, index) => {
                    const isSelected = selectedEmotion === emotion.id;
                    return (
                      <div key={emotion.id} className="flex-1 flex flex-col items-center gap-3">
                        <motion.button
                          onClick={() => setSelectedEmotion(emotion.id)}
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-full aspect-square rounded-3xl flex items-center justify-center text-3xl transition-all shadow-sm ${
                            isSelected 
                              ? "bg-white border-white scale-110 shadow-xl z-10" 
                              : "bg-white/40 border-transparent hover:bg-white/60"
                          } border-2`}
                          style={isSelected ? { borderColor: `${emotion.color}40` } : {}}
                        >
                          {emotion.icon}
                        </motion.button>
                        
                        {/* LED Level Scale */}
                        <div className="flex gap-[2px] w-full px-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="h-1.5 flex-1 rounded-full transition-all duration-300"
                              style={{
                                backgroundColor: isSelected || (selectedEmotion === null && index * 2 >= i * 2)
                                  ? emotion.color 
                                  : `${emotion.color}20`,
                                opacity: isSelected ? 1 : 0.3,
                                boxShadow: isSelected ? `0 0 8px ${emotion.color}` : "none"
                              }}
                            />
                          ))}
                        </div>
                        <span className={`text-[10px] font-bold ${isSelected ? "text-gray-800" : "text-gray-400"}`}>
                          {emotion.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Context Tags */}
              <div className="mb-6">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block px-1">
                  Context (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedTags.includes(tag)
                          ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                          : "bg-white/60 text-gray-600 hover:bg-white"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reflection */}
              <div className="mb-8">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block px-1">
                  Reflection (optional)
                </label>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value.slice(0, 140))}
                  placeholder="What's on your mind?"
                  rows={3}
                  className="w-full rounded-3xl bg-white/60 border border-white/20 p-4 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition-all resize-none shadow-sm"
                />
                <div className="flex justify-end mt-2 px-2">
                  <span className={`text-[10px] font-bold ${reflection.length >= 130 ? "text-red-400" : "text-gray-400"}`}>
                    {reflection.length}/140
                  </span>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                onClick={handleSave}
                disabled={!selectedEmotion || isSaving}
                whileHover={selectedEmotion ? { scale: 1.02, y: -2 } : {}}
                whileTap={selectedEmotion ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-3xl font-bold text-white transition-all shadow-xl ${
                  selectedEmotion 
                    ? "bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 shadow-purple-500/25 hover:shadow-purple-500/40" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isSaving ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </div>
                ) : "Save"}
              </motion.button>

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <span className="text-[10px] font-bold tracking-widest uppercase italic">
                  🔒 Private & Secure
                </span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
