export function generatePRD(product: any) {
  const { name, architecture } = product;
  if (!architecture) return "# Product Architecture\nPending generation...";

  return `
# PRD: ${name}

## 1. Concept & Vision
${architecture.concept}

## 2. Problem Statement
${architecture.problemStatement}

## 3. Target Audience
${architecture.targetAudience.map((a: string) => `- ${a}`).join('\n')}

## 4. MVP Scope
${architecture.mvpScope}

## 5. Core Features
${architecture.coreFeatures.map((f: any) => `### ${f.name} (${f.priority})\n${f.description}`).join('\n\n')}

## 6. Future Roadmap
${architecture.futureRoadmap.map((r: string) => `- ${r}`).join('\n')}
`.trim();
}

export function generateUXSpecs(product: any) {
  const { name, flows } = product;
  if (!flows || flows.length === 0) return "# UX Flows\nPending generation...";

  return `
# UX Specification: ${name}

${flows.map((flow: any) => `
## Flow: ${flow.name} (${flow.type})

${flow.screens.map((screen: any, i: number) => `
### ${i + 1}. ${screen.name}
**Purpose:** ${screen.purpose}
**Primary Action:** ${screen.primaryAction}
**Components:** ${screen.components.join(', ')}

#### States:
- **Default:** ${screen.states.default}
- **Loading:** ${screen.states.loading}
- **Empty:** ${screen.states.empty}
- **Error:** ${screen.states.error}
- **Success:** ${screen.states.success}

**Next:** ${screen.transition}
`).join('\n---\n')}
`).join('\n\n')}
`.trim();
}

export function generateDecisionLog(decisions: any[]) {
  return `
# Product Decision Log

${decisions.map((d: any) => `
## [${d.type}] ${d.statement}
**Date:** ${new Date(d.createdAt).toLocaleDateString()}
**Source:** ${d.source}

### Rationale
${d.rationale || "No specific rationale provided."}
`).join('\n---\n')}
`.trim();
}
