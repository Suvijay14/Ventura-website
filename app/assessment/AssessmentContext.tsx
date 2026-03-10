"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  AssessmentAnswers,
  DEFAULT_ANSWERS,
  RiskLevel,
} from "./types";

interface AssessmentContextType {
  answers: AssessmentAnswers;
  updateAnswers: (updates: Partial<AssessmentAnswers>) => void;
  toggleArrayAnswer: (
    key: keyof AssessmentAnswers,
    value: string
  ) => void;
  step: number;
  setStep: (step: number) => void;
  riskLevel: RiskLevel;
  setRiskLevel: (level: RiskLevel) => void;
  reset: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<AssessmentAnswers>(DEFAULT_ANSWERS);
  const [step, setStep] = useState(1);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("unknown");

  const updateAnswers = useCallback((updates: Partial<AssessmentAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleArrayAnswer = useCallback(
    (key: keyof AssessmentAnswers, value: string) => {
      setAnswers((prev) => {
        const arr = (prev[key] as string[]) || [];
        const newArr = arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value];
        return { ...prev, [key]: newArr };
      });
    },
    []
  );

  const reset = useCallback(() => {
    setAnswers(DEFAULT_ANSWERS);
    setStep(1);
    setRiskLevel("unknown");
  }, []);

  return (
    <AssessmentContext.Provider
      value={{
        answers,
        updateAnswers,
        toggleArrayAnswer,
        step,
        setStep,
        riskLevel,
        setRiskLevel,
        reset,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used within AssessmentProvider");
  return ctx;
}
