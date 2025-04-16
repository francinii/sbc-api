export interface Condition {
    id: number;
    field: string;
    operator: string;
    value: string;
  }
  
  export interface Rule {
    id: number;
    message: string;
    score_change: number;
    effect: "success" | "info" | "warning" | "danger";
    conditions: Condition[];
  }
  