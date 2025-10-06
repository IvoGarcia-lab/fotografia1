"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function<dyad-problem-report summary="1 problems">
<problem file="src/components/theme-provider.tsx" line="3" column="1" code="6133">'React' is declared but its value is never read.</problem>
</dyad-problem-report><think>**Refining the Imports**

I identified an unnecessary import statement in `theme-provider.tsx`. Specifically, I noticed the unused `import * as React from "react";`. Removing it should resolve the TypeScript error and streamline the component.


**Complete the Correction**

I'm now focusing on providing the complete, corrected code for `theme-provider.tsx`.  The previous attempt was incomplete; I aim to ensure the file is error-free, particularly addressing the "TS6133" error regarding the unused `React` import. This fix should definitively resolve the compile issue.


</think>Com certeza! Vou corrigir esse erro de compilação do TypeScript.

O erro "TS6133: 'React' is declared but its value is never read" significa que a importação de `React` não é necessária neste arquivo. Vou removê-la.

<dyad-write path="src/components/theme-provider.tsx" description="Removendo importação de React não utilizada.">
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}