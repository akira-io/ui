// src/components/ui/floating-sheet-context.ts
import * as React from "react";
var floatingSheetDefaultLabels = {
  backLabel: "Back",
  closeLabel: "Close"
};
var FLOATING_SHEET_OFFSET_LIMIT = 3;
var FloatingSheetStackContext = React.createContext(null);
function useFloatingSheetStack() {
  const context = React.useContext(FloatingSheetStackContext);
  if (!context) {
    throw new Error(
      "FloatingSheet must be rendered inside a FloatingSheetStack."
    );
  }
  return context;
}
var floatingSheetDefaultEdges = {
  top: true,
  bottom: true
};
var FloatingSheetEdgesContext = React.createContext(floatingSheetDefaultEdges);
var FloatingSheetReportEdgesContext = React.createContext(null);

// src/hooks/use-sheet-portal-container.ts
import * as React2 from "react";
function useSheetPortalContainer(container) {
  const stack = React2.useContext(FloatingSheetStackContext);
  return container ?? stack?.container ?? void 0;
}

export {
  floatingSheetDefaultLabels,
  FLOATING_SHEET_OFFSET_LIMIT,
  FloatingSheetStackContext,
  useFloatingSheetStack,
  floatingSheetDefaultEdges,
  FloatingSheetEdgesContext,
  FloatingSheetReportEdgesContext,
  useSheetPortalContainer
};
//# sourceMappingURL=chunk-EXTOGROG.js.map