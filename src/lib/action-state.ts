//arc/lib/actionState.ts
export interface ActionState {
    success: boolean;
    message: string | null;
    data?: any;
  }